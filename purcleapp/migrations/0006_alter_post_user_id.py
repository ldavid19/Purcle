# Generated by Django 4.0 on 2022-03-31 07:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('purcleapp', '0005_userprofile_user_blocked_userprofile_user_followers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='purcleapp.userprofile'),
        ),
    ]
