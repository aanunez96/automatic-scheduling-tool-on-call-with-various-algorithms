from django.db import models

# Create your models here.
class person (models.Model):
    idUci = models.CharField(primary_key=True, max_length=200, blank=False, null=False)