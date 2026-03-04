##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## views
##

# Create your views here.

from rest_framework import viewsets
from rest_framework.generics import RetrieveAPIView
from rest_framework.exceptions import ValidationError
from carts.permissions import CartPermissions
from carts.models import Cart, CartItem
from carts.serializers import CartSerializer, CartItemSerializer

class CartView(RetrieveAPIView):
    serializer_class =  CartSerializer
    permission_classes = [CartPermissions]

    def get_object(self):
        cart, _ = Cart.objects.get_or_create(buyer=self.request.user)
        return cart

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [CartPermissions]

    def get_queryset(self):
        return CartItem.objects.filter(cart__buyer=self.request.user)

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(buyer=self.request.user)
        product = serializer.validated_data['product']
        quantity = serializer.validated_data ['quantity']

        if quantity > product.quantity:
            raise ValidationError("Insufficient stock")

        item = CartItem.objects.filter(cart=cart, product=product).first()
        if item:
            item.quantity += quantity
            item.save()
        else:
            serializer.save(cart=cart)

    def perform_update(self, serializer):
        item = serializer.instance
        quantity = serializer.validated_data.get('quantity', item.quantity)
        product = item.product

        if quantity > product.quantity:
            raise ValidationError("Insufficient stock")

        serializer.save()
