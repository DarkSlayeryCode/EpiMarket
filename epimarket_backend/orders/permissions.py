##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## permissions
##

from rest_framework import permissions

class OrderPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.role == 'BUYER' or request.user.is_staff)

    def has_object_permission(self, request, view, obj):
        if request.user.role == 'BUYER' and obj.buyer == request.user:
            return True
        if request.user.is_staff:
            return True
