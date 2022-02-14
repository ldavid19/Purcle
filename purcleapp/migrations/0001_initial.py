# Generated by Django 4.0.2 on 2022-02-13 19:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_email', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_topic', models.CharField(max_length=100)),
                ('post_type', models.IntegerField()),
                ('post_is_anonymous', models.BooleanField()),
                ('post_title', models.CharField(max_length=100)),
                ('post_content', models.CharField(max_length=500)),
                ('post_time', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='purcleapp.user')),
            ],
        ),
    ]