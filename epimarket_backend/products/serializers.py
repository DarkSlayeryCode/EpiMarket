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
        fields = ['product_name', 'product_photo', 'price', 'quantity', 'description']

class PublicProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_name', 'description', 'price', 'product_photo', 'seller']

class PrivateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['product_name', 'description', 'price', 'quantity', 'product_photo', 'seller']

class AdminProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
