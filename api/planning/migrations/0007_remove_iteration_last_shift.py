# Generated by Django 3.0.1 on 2020-03-26 20:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planning', '0006_auto_20200326_0542'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='iteration',
            name='last_shift',
        ),
    ]