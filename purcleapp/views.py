from os import lseek
from django.shortcuts import render
from django.http.response import JsonResponse

from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from .serializers import *
from purcleapp import views
from django.shortcuts import render
from django.urls import path

from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view

from rest_framework import generics

from django.contrib.auth import get_user_model

# Create your views here.

# urlpatterns = [S
#     #path(r'^api/posts$', views.posts_list),
#     #path(r'^api/posts/(?P<pk>[0-9]+)$', views.posts_detail),
#     #path(r'^api/posts/published$', views.posts_list_published),
#     path(r'^api/profile/(?P<pk>[0-9]+)$', views.profile_detail)
# ]

@api_view(['GET', 'POST', 'DELETE', 'PUT', 'PATCH'])
def profile_detail(request, pk):
    print(request)
    print(pk)
    try: 
        userprofile = UserProfile.objects.get(pk=pk) 
    except UserProfile.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET': 
        user_profile_serializer = UserProfileSerializer(userprofile) 
        return JsonResponse(user_profile_serializer.data)

    elif request.method == 'PUT':
        print("this is a put request")
        user_data = JSONParser().parse(request)
        print(user_data)
        print('--------')
        user_serializer = UserProfileSerializer(userprofile, data=user_data) 
        if user_serializer.is_valid(): 
            user_serializer.save() 
            return JsonResponse(user_serializer.data)
        print(user_serializer.errors)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class SignUpView(generics.CreateAPIView):
#     queryset = get_user_model().objects.all()
#     serializer_class = UserSerializer

@api_view(['GET', 'POST', 'DELETE', 'PUT', 'PATCH'])
def user_detail(request):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save() 
            return JsonResponse(user_serializer.data)
        print(user_serializer.errors)
        message = ""
        for error in user_serializer.errors:
            message = user_serializer.errors[error][0].title()
        return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)
    

# @api_view(['GET', 'POST', 'DELETE'])
# def posts_list(request):
#     # GET list of posts, POST a new post, DELETE all posts
 
 
# @api_view(['GET', 'PUT', 'DELETE'])
# def posts_detail(request, pk):
#     # find post by pk (id)
#     try: 
#         post = Post.objects.get(pk=pk) 
#     except Post.DoesNotExist: 
#         return JsonResponse({'message': 'The post does not exist'}, status=status.HTTP_404_NOT_FOUND) 
#     # GET / PUT / DELETE post 
      
# # @api_view(['GET'])
# # def posts_list_published(request):
#     # GET all published posts