# Generated by Django 4.0.2 on 2022-03-26 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('purcleapp', '0002_alter_userprofile_user_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='user_profile_picture',
            field=models.ImageField(blank=True, default='default.jpg', null=True, upload_to='profile_images'),
        ),
    ]