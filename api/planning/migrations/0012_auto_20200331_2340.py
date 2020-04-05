# Generated by Django 3.0.1 on 2020-03-31 23:40

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import re


class Migration(migrations.Migration):

    dependencies = [
        ('personal', '0005_remove_person_shift'),
        ('planning', '0011_auto_20200330_2010'),
    ]

    operations = [
        migrations.AddField(
            model_name='personal',
            name='days',
            field=models.CharField(choices=[(1, 'Monday'), (2, 'Tuesday'), (3, 'Wednesday'), (4, 'Thursday'), (5, 'Friday'), (6, 'Saturday'), (7, 'Sunday')], default=None, max_length=1, validators=[django.core.validators.RegexValidator(re.compile('^\\d+(?:,\\d+)*\\Z'), code='invalid', message='Enter only digits separated by commas.')]),
        ),
        migrations.AlterField(
            model_name='iteration',
            name='executor',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='personal.Person'),
        ),
        migrations.AlterField(
            model_name='personal',
            name='idUci',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='personal.Person'),
        ),
        migrations.DeleteModel(
            name='SpecificDay',
        ),
    ]