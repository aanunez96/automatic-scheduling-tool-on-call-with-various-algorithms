# Generated by Django 3.0.1 on 2020-04-01 00:17

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import re


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0005_remove_person_shift'),
        ('planning', '0014_auto_20200331_2359'),
    ]

    operations = [
        migrations.AlterField(
            model_name='iteration',
            name='executor',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='personal.Person'),
        ),
        migrations.AlterField(
            model_name='personal',
            name='days',
            field=models.CharField(default='', max_length=20, validators=[django.core.validators.RegexValidator(re.compile('^\\d+(?:,\\d+)*\\Z'), code='invalid', message='Enter only digits separated by commas.')]),
        ),
        migrations.AlterField(
            model_name='personal',
            name='idUci',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='personal.Person'),
        ),
    ]
