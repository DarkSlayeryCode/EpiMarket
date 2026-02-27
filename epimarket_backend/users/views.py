##
## EPITECH PROJECT, 2026
## EpiMarket
## File description:
## views
##

# Create your views here.

from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from users.models import User
from users.permissions import IsAdmin
from rest_framework.permissions import AllowAny, IsAuthenticated
from users.serializers import UserSerializer, PublicUserSerializer, PrivateUserSerializer, AdminUserSerializer, RegisterSerializer

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return self.queryset
        return self.queryset.filter(role="SELLER")

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return UserSerializer

        if self.request.user.is_staff:
            return AdminUserSerializer

        if self.request.user.is_authenticated:
            return PrivateUserSerializer

        return PublicUserSerializer

class RegisterView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "message" : "User created successfully",
                    "id" : user.id,
                    "username" : user.username,
                    "email" : user.email
                },status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
