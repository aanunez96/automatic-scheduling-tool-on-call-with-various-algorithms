# Generated by Django 3.0.1 on 2020-03-27 16:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('repo_plan', '0002_auto_20200326_0632'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shift',
            name='person',
        ),
    ]
