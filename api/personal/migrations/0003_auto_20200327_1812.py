# Generated by Django 3.0.1 on 2020-03-27 18:12

from django.db import migrations
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0002_person_shift'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='person',
            managers=[
                ('manager', django.db.models.manager.Manager()),
            ],
        ),
    ]
