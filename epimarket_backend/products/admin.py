##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## admin
##

# Register your models here.

from django.contrib import admin
from products.models import Product

admin.site.register(Product)
