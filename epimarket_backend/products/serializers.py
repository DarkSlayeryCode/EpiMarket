##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## serializers
##

from products.models import Product
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_name', 'price', 'quantity', 'description', 'seller']
