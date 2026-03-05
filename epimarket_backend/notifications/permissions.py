##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## permissions
##

from rest_framework import permissions

class NotificationPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):
        return request.user == obj.recipient
