"""mushroomApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from rest_framework import routers
from django.urls import path
from mushroomIdentifyer.views import MushroomViewSet, search_mushrooms, predict_mushroom, predict_more_mushroom

router = routers.DefaultRouter()
router.register(r'mushrooms', MushroomViewSet)

urlpatterns = [
    path('mushrooms/', MushroomViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('mushrooms/<int:pk>/', MushroomViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('mushrooms/search/', search_mushrooms, name='search_mushrooms'),
    path('mushrooms/predict/', predict_mushroom, name='predict_mushroom'),
    path('mushrooms/predict_more/', predict_more_mushroom, name='predict_more_mushroom')
]
