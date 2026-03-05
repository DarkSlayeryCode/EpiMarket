##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## serializers
##

from rest_framework import serializers
from notifications.models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'recipient', 'message', 'is_read', 'created_at']
        extra_kwargs = {
            'created_at': {'read_only': True}
        }
