
from rest_framework import serializers
from .models import Theme, Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields= "__all__"

class ThemeSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    class Meta:
        model = Theme
        fields = "__all__"
        depth= 1

