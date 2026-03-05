##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## views
##

# Create your views here.

from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from notifications.permissions import NotificationPermissions
from notifications.models import Notification
from notifications.serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [NotificationPermissions]
    http_method_names = ['get', 'patch']

    def get_queryset(self):
        if self.request.user.is_staff:
            return Notification.objects.all()
        return Notification.objects.filter(recipient=self.request.user)

    def perform_update(self, serializer):
        notif = serializer.instance
        is_read = serializer.validated_data.get('is_read', notif.is_read)

        if notif.is_read and not is_read:
            raise PermissionDenied("Cannot mark notification as unread")

        serializer.save()
