# Generated by Django 4.0.2 on 2022-04-18 22:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('purcleapp', '0007_alter_post_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reaction',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth.user'),
        ),
    ]
