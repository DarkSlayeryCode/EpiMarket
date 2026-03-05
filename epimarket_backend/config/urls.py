"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import SimpleRouter
from users.views import UserViewSet, RegisterView
from products.views import ProductViewSet
from carts.views import CartItemViewSet, CartView
from orders.views import OrderViewSet
from notifications.views import NotificationViewSet
from django.urls import path, include

router = SimpleRouter()
router.register('users', UserViewSet, basename='users')
router.register('products', ProductViewSet, basename='products')
router.register('cart-items', CartItemViewSet, basename='cart-items')
router.register('orders', OrderViewSet, basename='orders')
router.register('notifications', NotificationViewSet, basename='notifications')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='re-login'),
    path('api/carts/', CartView.as_view(), name='carts'),
    path('api/', include(router.urls)),
]
