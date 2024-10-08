# Generated by Django 5.0.7 on 2024-09-09 23:27

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
        ('clinic', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='staff',
            name='appointments',
            field=models.ManyToManyField(blank=True, related_name='appointments', to='clinic.appointment'),
        ),
        migrations.AddField(
            model_name='staff',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='staff_profile', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddIndex(
            model_name='staff',
            index=models.Index(fields=['contact_number'], name='staff_contact_1a5078_idx'),
        ),
        migrations.AddIndex(
            model_name='staff',
            index=models.Index(fields=['user'], name='staff_user_id_419644_idx'),
        ),
    ]
