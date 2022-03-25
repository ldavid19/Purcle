from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'id',
            'post_topic',
            'post_type',
            'user_id',
            'post_is_anonymous',
            'post_title',
            'post_content',
            'post_time'
        )