##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## permissions
##

from rest_framework import permissions

class CartPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'BUYER'

    def has_object_permission(self, request, view, obj):
        return obj.cart.buyer == request.user
