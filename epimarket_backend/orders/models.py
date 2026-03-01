##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## models
##

# Create your models here.

from django.db import models
from users.models import User
from products.models import Product

class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    ]
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'BUYER'})
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    total_price = models.PositiveIntegerField(editable=False, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_total(self):
        """Calculate total price from order items"""
        total = sum(item.quantity * item.price_at_purchase for item in self.items.all())
        return total

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    seller = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'SELLER'})
    price_at_purchase = models.PositiveIntegerField()

    class Meta:
        unique_together = ['order', 'product']
