# Generated by Django 3.0.1 on 2020-03-28 04:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0004_auto_20200327_1912'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='person',
            name='shift',
        ),
    ]