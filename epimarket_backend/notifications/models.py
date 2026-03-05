##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## models
##

# Create your models here.

from django.db import models
from users.models import User

class Notification(models.Model):
    recipient = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField(max_length=500)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
