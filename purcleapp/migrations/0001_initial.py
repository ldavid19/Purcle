# Generated by Django 4.0.2 on 2022-04-26 20:21

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_type', models.IntegerField()),
                ('post_is_anonymous', models.BooleanField()),
                ('post_title', models.CharField(max_length=100)),
                ('post_content', models.CharField(max_length=500)),
                ('post_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('topic_id', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True)),
                ('topic_num_followers', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_email', models.EmailField(max_length=200)),
                ('profile_name', models.CharField(max_length=100, null=True)),
                ('first_name', models.CharField(max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50, null=True)),
                ('user_profile_picture', models.ImageField(blank=True, default='default.jpg', null=True, upload_to='profile_images')),
                ('user_bio', models.TextField(max_length=500)),
                ('user_followers', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, null=True, size=None)),
                ('user_following', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, null=True, size=None)),
                ('user_followers_count', models.FloatField(default=0)),
                ('user_following_count', models.FloatField(default=0)),
                ('user_following_topic', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, null=True, size=None)),
                ('user_blocked', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), blank=True, null=True, size=None)),
                ('allow_only_followed_users', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ThreadModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('has_unread', models.BooleanField(default=False)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Reaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reaction_type', models.IntegerField()),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='purcleapp.post')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='purcleapp.userprofile')),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='post_topic',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='purcleapp.topic'),
        ),
        migrations.AddField(
            model_name='post',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='MessageModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.CharField(max_length=200)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_read', models.BooleanField(default=False)),
                ('receiver_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('sender_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('thread', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='purcleapp.threadmodel')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_content', models.CharField(max_length=500)),
                ('comment_created_date', models.DateTimeField(auto_now_add=True)),
                ('comment_is_anonymous', models.BooleanField()),
                ('post_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='purcleapp.post')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='purcleapp.userprofile')),
            ],
        ),
    ]
