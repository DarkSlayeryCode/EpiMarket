##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## permissions
##

from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and obj == request.user

    def has_permission(self, request, view):
        return True
