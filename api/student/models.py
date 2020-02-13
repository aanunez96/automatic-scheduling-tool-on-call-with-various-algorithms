from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    uci_id = models.CharField(max_length=255)
    enable = models.BooleanField(default=True)

    def __str__(self):
        return self.uci_id
