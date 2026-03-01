##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## views
##

# Create your views here.

from rest_framework import viewsets
from products.models import Product
from products.permissions import ProductPermissions
from products.serializers import ProductSerializer, PrivateProductSerializer, PublicProductSerializer, AdminProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [ProductPermissions]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Product.objects.all()

        if user.is_authenticated and user.role == "SELLER":
            return Product.objects.filter(seller=user)

        return Product.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProductSerializer

        if self.request.user.is_staff:
            return AdminProductSerializer

        if self.request.user.is_authenticated:
            return PrivateProductSerializer

        return PublicProductSerializer
