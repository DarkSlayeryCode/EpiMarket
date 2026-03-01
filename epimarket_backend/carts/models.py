##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## models
##
# Create your models here.

from django.db import models
from django.core.exceptions import ValidationError
from users.models import User
from products.models import Product

class Cart(models.Model):
    buyer = models.ForeignKey(User, limit_choices_to={'role': 'BUYER'}, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    class Meta:
        unique_together = ['cart', 'product']

    def clean(self):
        super().clean()
        if self.quantity > self.product.quantity:
            raise ValidationError({
                'quantity': f'Quantity cannot exceed available stock ({self.product.quantity})'
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
