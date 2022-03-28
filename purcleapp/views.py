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


# Create your views here.

# urlpatterns = [S
#     #path(r'^api/posts$', views.posts_list),
#     #path(r'^api/posts/(?P<pk>[0-9]+)$', views.posts_detail),
#     #path(r'^api/posts/published$', views.posts_list_published),
#     path(r'^api/profile/(?P<pk>[0-9]+)$', views.profile_detail)
# ]


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def profile_detail(request, pk):
    print(request)
    print(pk)
    try: 
        userprofile = UserProfile.objects.get(pk=pk) 
    except UserProfile.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET': 
        user_profile_serializer = UserSerializer(userprofile) 
        return JsonResponse(user_profile_serializer.data)

    elif request.method == 'PUT':
        print("this is a put request")
        user_data = JSONParser().parse(request)
        print(user_data)
        user_serializer = UserSerializer(userprofile, data=user_data) 
        if user_serializer.is_valid(): 
            user_serializer.save() 
            return JsonResponse(user_serializer.data)
        print(user_serializer.errors)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'DELETE'])
def posts_list(request):
    if request.method == 'GET':

        post_list = Post.objects.all()

        posts_serializer = PostSerializer(post_list, many=True)
        return JsonResponse(posts_serializer.data, safe=False)
#     # GET list of posts, POST a new post, DELETE all posts
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def posts_detail(request, pk):
#     # find post by pk (id)
    try: 
        post = Post.objects.get(pk=pk) 
    except Post.DoesNotExist: 
        return JsonResponse({'message': 'The post does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        user_profile_serializer = UserSerializer(userprofile) 
        return JsonResponse(user_profile_serializer.data)
#     # GET / PUT / DELETE post 
      
# # @api_view(['GET'])
# # def posts_list_published(request):
#     # GET all published posts