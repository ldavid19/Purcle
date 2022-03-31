from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

class UserProfileSerializer(serializers.ModelSerializer):
    # def create(self, validated_data):
    #     validated_data['users_followers_count'] = 0
    #     validated_data['users_following_count'] = 0
    #     return self.Meta.model.objects.create(validated_data)

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

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            'user',
            'profile_name'
        )

class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate(self, data):
        # if data['password1'] != data['password2']:
        #     raise serializers.ValidationError('Passwords must match.')
        # try: 
        #     user = User.objects.get(email=data['email'])
        #     raise serializers.ValidationError('An account with this email already exists.')
        # except UserProfile.DoesNotExist: 
        #     print("good user")
        userErr = False
        emailErr = False

        # check if email already exists
        user = User.objects.filter(email=data['email']).first()
        if user:
            emailErr = True
        
        # check if username already exists
        user = User.objects.filter(email=data['username']).first()
        if user:
            userErr = True

        if userErr and emailErr:
            raise serializers.ValidationError('This email and username are both taken.')
        elif userErr:
            raise serializers.ValidationError('An account with this username already exists.')
        elif emailErr:
            raise serializers.ValidationError('An account with this email already exists.')

        return data

    def create(self, validated_data):
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password1', 'password2')
        }
        data['password'] = validated_data['password1']
        return self.Meta.model.objects.create_user(**data)

    class Meta:
        model = get_user_model()
        fields = (
            'id', 'email', 'username', 'password1', 'password2',
        )
        read_only_fields = ('id',)

# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email', 'password')
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

#         return user
