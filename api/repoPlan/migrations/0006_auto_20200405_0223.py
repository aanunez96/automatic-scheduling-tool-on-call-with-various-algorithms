# Generated by Django 3.0.1 on 2020-04-05 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0006_auto_20200405_0223'),
        ('repoPlan', '0005_auto_20200328_0441'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shift',
            name='person',
            field=models.ManyToManyField(to='personal.Person'),
        ),
    ]