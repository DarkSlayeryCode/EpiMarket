##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## views
##

# Create your views here.

from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from orders.permissions import OrderPermissions
from orders.models import Order, OrderItem
from carts.models import Cart, CartItem
from orders.serializers import OrderSerializer, OrderItemSerializer

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [OrderPermissions]
    serializer_class = [OrderSerializer]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Order.objects.all()

        return Order.objects.filter(buyer=self.request.user)

    def perform_create(self, serializer):
        cart = Cart.objects.get(buyer=self.request.user)
        cart_items = CartItem.objects.filter(cart=cart)
        order = Order.objects.create(buyer=self.request.user)
        for cart_item in cart_items:
            OrderItem.objects.create(product=cart_item.product, quantity=cart_item.quantity,
            price_at_purchase=cart_item.product.price, order=order, seller=cart_item.product.seller)
        order.total_price = order.calculate_total()
        order.save()
        cart_items.delete()

    def perform_update(self, serializer):
        order = serializer.instance
        status = serializer.validated_data.get('status', order.status)
        if status == 'CONFIRMED' and order.status != 'CONFIRMED':
            for item in order.items.all():
                product = item.product
                product.quantity -= item.quantity
                product.save()

    def perform_destroy(self, instance):
        raise ValidationError("Impossible to destroy an order ! It's a historic proof")
