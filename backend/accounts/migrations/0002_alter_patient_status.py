# Generated by Django 5.0.7 on 2024-08-27 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='status',
            field=models.CharField(blank=True, choices=[('active', 'Active'), ('discharged', 'Discharged'), ('observation', 'Observation')], db_column='status', default='active', max_length=25, null=True),
        ),
    ]
