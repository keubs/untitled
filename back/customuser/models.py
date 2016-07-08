from django.db import models
from django.contrib.auth.models import AbstractUser
from address.models import AddressField

# Create your models here.
class CustomUser(AbstractUser):
    social_thumb = models.URLField(null=True, blank=True)
    address = AddressField(null=True)
    def __str__(self):
        return str(self.username)