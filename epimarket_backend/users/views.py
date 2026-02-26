##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## views
##

# Create your views here.

from rest_framework import viewsets
from users.models import User
from users.permissions import IsAdmin
from rest_framework.permissions import AllowAny
from users.serializers import UserSerializer, PublicUserSerializer, PrivateUserSerializer, AdminUserSerializer

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAdmin]

    def get_queryset(self):
        if self.action == 'list':
            return self.queryset.filter(role="SELLER")
        return self.queryset

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return UserSerializer

        if self.request.user.is_staff:
            return AdminUserSerializer

        if self.request.user.is_authenticated:
            return PrivateUserSerializer

        return PublicUserSerializer
