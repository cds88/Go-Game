from django.db import models

# Create your models here.
class Theme(models.Model):
    title = models.TextField()


class Image(models.Model):
    theme = models.ForeignKey(
        Theme, on_delete=models.CASCADE, blank=False, null=False, related_name="images")
    image = models.ImageField(blank=False)
