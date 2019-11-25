
from . import views
from django.urls import path, include
from rest_framework import routers


router = routers.DefaultRouter()
router.register('themes', views.ThemeView, base_name="themes")
router.register('images', views.ImageView, base_name="images")
urlpatterns =  router.urls


