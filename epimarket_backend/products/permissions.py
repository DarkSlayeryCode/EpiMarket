##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## permissions
##

from rest_framework import permissions

class ProductPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.method == "POST":
            return request.user.is_authenticated and request.user.role == "SELLER"

        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user.is_staff:
            return True

        return obj.seller == request.user
