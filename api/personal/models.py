from django.db import models

# Create your models here.


class person (models.Model):
    Uci = models.CharField(max_length=200, blank=False, null=False)
