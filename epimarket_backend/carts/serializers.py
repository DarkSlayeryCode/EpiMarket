##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## serializers
##

from rest_framework import serializers
from carts.models import Cart, CartItem

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.product_name', read_only=True)

    product_price = serializers.IntegerField(source='product.price', read_only=True)

    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'product_name', 'product_price', 'subtotal']
        extra_kwargs = {
            'product_name': {'read_only': True},
            'product_price': {'read_only': True},
        }
    def get_subtotal(self, obj):
        return obj.quantity * obj.product.price

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price']

    def get_total_price(self, obj):
        return sum(
            item.quantity * item.product.price
            for item in obj.items.all()
        )
