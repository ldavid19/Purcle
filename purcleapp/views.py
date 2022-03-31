from os import lseek
from pydoc_data.topics import topics
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

from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView

from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from django.contrib.auth import logout

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


# Create your views here.

# urlpatterns = [S
#     #path(r'^api/posts$', views.posts_list),
#     #path(r'^api/posts/(?P<pk>[0-9]+)$', views.posts_detail),
#     #path(r'^api/posts/published$', views.posts_list_published),
#     path(r'^api/profile/(?P<pk>[0-9]+)$', views.profile_detail)


@api_view(['GET', 'POST', 'DELETE'])
def profile_detail(request, pk):
    print(request)
    print(pk)
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    try:
        userprofile = UserProfile.objects.get(user=pk) 
    except UserProfile.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET': 
        user_profile_serializer = UserProfileSerializer(userprofile) 
        return JsonResponse(user_profile_serializer.data)

@api_view(['GET', 'POST', 'DELETE'])
def profile_id(request, pk):
    try:
        userprofile = UserProfile.objects.get(pk=pk) 
    except UserProfile.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET': 
        user_profile_serializer = UserProfileSerializer(userprofile) 
        return JsonResponse(user_profile_serializer.data)

@api_view(['PUT', 'PATCH'])
#@permission_classes((IsAuthenticated, ))
def profile_update(request, pk):
    try: 
        userprofile = UserProfile.objects.get(user=pk) 
    except UserProfile.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        
        user_data = JSONParser().parse(request)
        #print(user_data)

        user_serializer = UserProfileSerializer(userprofile, data=user_data, partial=True) 
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
        print(user_data)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            # profile_data = {
            #     'profile_name': user_data['username'],
            #     'user_email': user_data['email']
            # }
            # print(profile_data)
            # user = User.objects.get(pk=user_serializer.data['id'])
            # userprofile = UserProfile.objects.get(user=user)
            # print(userprofile.get_id())
            # user_profile_serializer = UserProfileSerializer(userprofile, data=profile_data)
            # print(user_profile_serializer.data)
            # if user_profile_serializer.is_valid(): 
            #     user_profile_serializer.save()
            # else:
            #     print("user profile serializer failed")
            # UserProfile.objects.create(profile_name=user_data['username'], user_email=user_data['email'], user_id=user)

            return JsonResponse(user_serializer.data)
        #print(user_serializer.errors)
        message = ""
        for error in user_serializer.errors:
            message = user_serializer.errors[error][0].title()
        return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)
    
# returns multiple posts based on topic, if no argument specified, returns all posts
@api_view(['GET', 'POST', 'DELETE'])
def posts_list(request, pk=""):
    if request.method == 'GET':
        print("getting posts from topic: " + pk)

        if (pk == ""):
            post_list = Post.objects.all()
        else:
            post_list = Post.objects.filter(post_topic=pk)

        posts_serializer = PostSerializer(post_list, many=True)
        return JsonResponse(posts_serializer.data, safe=False)
#  ``   # GET list of posts, POST a new post, DELETE all posts

@api_view(['GET'])
def post_detail(request, pk):
    try: 
        post = Post.objects.get(pk=pk) 
    except Post.DoesNotExist: 
        return JsonResponse({'message': 'The post does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        print("requesting post #" + pk)

        post_serializer = PostSerializer(post)
        return JsonResponse(post_serializer.data, safe=False)



class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        print("from views.py LoginAPI post():")
        print(request.data)
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)

def curr_user(request):
    current_user = request.user
    print("from views.py LoginAPI curr_user():")
    print(current_user.id)
    return JsonResponse({'curr_user': current_user.id})
# class RegisterAPI(generics.GenericAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         return Response({
#         "user": UserSerializer(user, context=self.get_serializer_context()).data,
#         "token": AuthToken.objects.create(user)[1]
#         })


# @api_view(['GET', 'POST', 'DELETE'])
# def posts_list(request):
#     # GET list of posts, POST a new post, DELETE all posts
 
'''
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
'''
      
# # @api_view(['GET'])
# # def posts_list_published(request):
#     # GET all published posts

@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def topic_list(request):
    if request.method == 'GET':
        topics = Topic.objects.all()

        topics_serializer = TopicSerializer(topics, many=True)
        return JsonResponse(topics_serializer.data, safe=False)

    elif request.method == 'POST':
        topic_data = JSONParser().parse(request)
        topic_serializer = TopicSerializer(data=topic_data)
        if topic_serializer.is_valid():
            topic_serializer.save()
            return JsonResponse(topic_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(topic_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def topic_detail(request, pk):
    print(request)
    print(pk)
    try: 
        topic = Topic.objects.get(pk=pk) 
    except Topic.DoesNotExist: 
        return JsonResponse({'message': 'The topic does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET': 
        topic_serializer = Topic(topic) 
        return JsonResponse(topic_serializer.data)

    elif request.method == 'PUT':
        print("this is a put request for a topic")
        topic_data = JSONParser().parse(request)
        print(topic_data)
        topic_serializer = Topic(topic, data=topic_data) 
        if topic_serializer.is_valid(): 
            topic_serializer.save() 
            return JsonResponse(topic_serializer.data)
        print(topic_serializer.errors)
        return JsonResponse(topic_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

<<<<<<< HEAD

@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def user_list(request):
    if request.method == 'GET':
        users = UserProfile.objects.all()


        user_list_serializer = UserListSerializer(users, many=True)
        return JsonResponse(user_list_serializer.data, safe=False)
=======
@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def post_list(request):
    # if request.method == 'GET':
    #     topics = Topic.objects.all()

    #     topics_serializer = TopicSerializer(topics, many=True)
    #     return JsonResponse(topics_serializer.data, safe=False)

    if request.method == 'POST':
        post_data = JSONParser().parse(request)
        print("from views.py post_list POST:")
        print(post_data)
        post_serializer = PostSerializer(data=post_data)
        if post_serializer.is_valid():
            post_serializer.save()
            return JsonResponse(post_serializer.data)
        message = ""
        for error in post_serializer.errors:
            message = post_serializer.errors[error][0].title()
        return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

    # if request.method == 'POST':
    #     post_data = JSONParser().parse(request)
    #     post_serializer = PostSerializer(data=post_data)
    #     if post_serializer.is_valid():
    #         post_serializer.save()
    #         return JsonResponse(post_serializer.data, status=status.HTTP_201_CREATED)
    #     return JsonResponse(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
>>>>>>> 9e42d90206a2d356c7cb36030567c82649b7a436
