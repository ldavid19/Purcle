# Generated by Django 4.0 on 2022-03-31 07:04

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0013_alter_user_email'),
        ('purcleapp', '0004_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='user_blocked',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, default=list, size=None),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='user_followers',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, default=list, size=None),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='user_following',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, default=list, size=None),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='user_following_topic',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, default=list, size=None),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='post',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth.user'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='auth.user'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user_email',
            field=models.EmailField(max_length=200),
        ),
    ]