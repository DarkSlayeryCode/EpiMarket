##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## models
##

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

class User (AbstractUser):
    ROLE_CHOICES = [
        ('SELLER', 'Seller'),
        ('BUYER', 'Buyer')
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, verbose_name="Role")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
