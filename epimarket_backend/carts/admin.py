##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## admin
##

# Register your models here.

from django.contrib import admin
from carts.models import Cart, CartItem

admin.site.register(Cart)
admin.site.register(CartItem)
