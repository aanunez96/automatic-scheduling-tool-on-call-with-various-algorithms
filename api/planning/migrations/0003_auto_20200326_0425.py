# Generated by Django 3.0.1 on 2020-03-26 04:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planning', '0002_auto_20200325_2019'),
    ]

    operations = [
        migrations.AddField(
            model_name='iteration',
            name='last_shift',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='iteration',
            name='date_end',
            field=models.DateField(default=datetime.date(2020, 3, 26)),
        ),
        migrations.AlterField(
            model_name='iteration',
            name='date_start',
            field=models.DateField(default=datetime.date(2020, 3, 26)),
        ),
    ]