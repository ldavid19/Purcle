# Generated by Django 4.0.2 on 2022-04-21 20:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('purcleapp', '0004_alter_post_post_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='post_image',
        ),
    ]
