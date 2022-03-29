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

from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView

from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


# Create your views here.

# urlpatterns = [S
#     #path(r'^api/posts$', views.posts_list),
#     #path(r'^api/posts/(?P<pk>[0-9]+)$', views.posts_detail),
#     #path(r'^api/posts/published$', views.posts_list_published),
#     path(r'^api/profile/(?P<pk>[0-9]+)$', views.profile_detail)
# ]

@api_view(['GET', 'POST', 'DELETE'])
def profile_detail(request, pk):
    print(request)
    print(pk)
    try: 
        userprofile = UserProfile.objects.get(user_id=pk) 
    except UserProfile.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET': 
        user_profile_serializer = UserProfileSerializer(userprofile) 
        return JsonResponse(user_profile_serializer.data)

@api_view(['PUT', 'PATCH'])
@permission_classes((IsAuthenticated, ))
def profile_update(request, pk):
    try: 
        userprofile = UserProfile.objects.get(pk=pk) 
    except UserProfile.DoesNotExist: 
        return JsonResponse({'message': 'The user does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        print("this is a put request")
        print(request)
        user_data = JSONParser().parse(request)
        print(user_data)
        print('--------')
        user_serializer = UserProfileSerializer(userprofile, data=user_data) 
        if user_serializer.is_valid(): 
            user_serializer.save() 
            return JsonResponse(user_serializer.data)
        print(user_serializer.errors)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignUpView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


def curr_user(request):
    current_user = request.user
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