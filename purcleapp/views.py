from os import lseek
from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from .serializers import *
from purcleapp import views
from django.shortcuts import render
from django.urls import path
# Create your views here.

# urlpattern = [
#     path(r'^api/posts$', views.posts_list),
#     path(r'^api/posts/(?P<pk>[0-9]+)$', views.posts_detail),
#     path(r'^api/posts/published$', views.posts_list_published)
# ]

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