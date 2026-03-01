##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## models
##

# Create your models here.
from django.db import models
from users.models import User

class Product(models.Model):
    product_name = models.CharField(max_length=15, blank=False)
    price = models.PositiveIntegerField(null=True, blank=False)
    quantity = models.PositiveIntegerField(null=True, blank=False)
    description = models.TextField(help_text='A little description of your product', blank=False, max_length=75)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role' : 'SELLER'})
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    product_photo = models.ImageField(help_text='Upload a photo of your product')
