##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## serializers
##

from rest_framework import serializers
from orders.models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price_at_purchase']
        extra_kwargs = {
            'price_at_purchase': {'read_only': True}
        }

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'items', 'total_price', 'status', 'created_at']
        extra_kwargs = {
            'created_at': {'read_only': True}
        }

    def get_total_price(self, obj):
        return sum(
            item.quantity * item.price_at_purchase
            for item in obj.items.all()
        )
