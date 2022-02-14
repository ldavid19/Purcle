# Generated by Django 4.0.2 on 2022-02-13 22:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('purcleapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('topic_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('topic_num_followers', models.FloatField()),
            ],
        ),
        migrations.AlterField(
            model_name='post',
            name='post_topic',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='purcleapp.topic'),
        ),
    ]