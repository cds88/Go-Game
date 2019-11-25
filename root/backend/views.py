from django.shortcuts import render
from .serializers import ThemeSerializer, ImageSerializer
from .models import Theme, Image
from rest_framework import viewsets
# Create your views here.



class ThemeView(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class=  ThemeSerializer


class ImageView(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer