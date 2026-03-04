##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## admin
##

# Register your models here.

from django.contrib import admin
from users.models import User

admin.site.register(User)
