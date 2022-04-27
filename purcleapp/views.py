from email import message
from os import lseek
from pydoc_data.topics import topics
from django.dispatch import receiver
from django.shortcuts import render, redirect
from django.http.response import JsonResponse, HttpResponse

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

from django.views import View

from django.db.models import Q

from .forms import *
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
        print("inside user_detail")
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
            print("valid!")
            return JsonResponse(user_serializer.data)
        #print(user_serializer.errors)
        print("invalid")
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

        print(post_list)
        if not post_list:
            return JsonResponse({'message': 'The post does not exist'}, status=status.HTTP_404_NOT_FOUND)


        posts_serializer = PostSerializer(post_list, many=True)
        return JsonResponse(posts_serializer.data, safe=False)
#  ``   # GET list of posts, POST a new post, DELETE all posts

# returns multiple posts based on user, returns all posts
@api_view(['GET', 'POST', 'DELETE'])
def user_posts_list(request, pk=""):
    if request.method == 'GET':
        print("getting posts from user: " + pk)

        post_list = Post.objects.filter(user_id=pk)

        if not post_list:
            return JsonResponse({'message': 'User has no posts'}, status=status.HTTP_404_NOT_FOUND)


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

@api_view(['GET', 'POST', 'DELETE'])
def convert(request, pk=""):
    if request.method == 'GET':
        #userprofile = UserProfile.objects.filter(user_id=pk)
        userprofile = UserProfile.objects.values_list('id', flat=True).get(user_id=pk)
        print("\nquery:\n")
        print(userprofile)
        print("\n")
        return JsonResponse({'curr_userprofile': userprofile})
        #userprofile_serializer = UserProfileSerializer(userprofile)
        #return JsonResponse(userprofile_serializer.data, safe=False)

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
    print("getting topic: " + pk)

    try: 
        topic = Topic.objects.get(pk=pk) 
    except Topic.DoesNotExist: 
        return JsonResponse({'message': 'The topic does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET': 
        topic_serializer = TopicSerializer(topic) 
        return JsonResponse(topic_serializer.data, safe=False)

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


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def user_list(request):
    if request.method == 'GET':
        users = UserProfile.objects.all()


        user_list_serializer = UserListSerializer(users, many=True)
        return JsonResponse(user_list_serializer.data, safe=False)

# def image_detail(request):
#     if request.method == 'POST':
#         form = PostForm(request.POST, request.FILES)
#         if form.is_valid():
#             form.save()
#             post_serializer = PostSerializer(form)
#             return JsonResponse(post_serializer.data, safe=False)

# def image_detail(request):
#     if request.method == 'POST':
#         form = PostForm(request.POST, request.FILES)
#         if form.is_valid():
#             form.save()
#             return redirect('login')
#     else:
#         form = PostForm()
#     return render(request, 'image_form.html', {'form': form})

@api_view(['GET', 'POST', 'DELETE', 'PUT'])
def post_list(request):
    
    if request.method == 'POST':
        print("this prints")
        #print(request.data.post_image)
        post_data = JSONParser().parse(request)
        print("from views.py post_list POST:")
        print(post_data)
        #print(post_data.post_image)
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



class CreateThread(View):
    
    # def get(self, request, *args, **kwargs):
    #     form = ThreadForm()

    #     context = {
    #         'form': form
    #     }

    #     return HttpResponse(form.as_p())


    def post(self, request, *args, **kwargs):
        #form = ThreadForm(request.POST)


        username = JSONParser().parse(request)['username']
        print(username)

        try:
            receiver = User.objects.get(username=username)

            if ThreadModel.objects.filter(user=request.user, receiver=receiver).exists():

                thread = ThreadModel.objects.filter(user=request.user, receiver=receiver)[0]

                return redirect('thread', pk=thread.pk)
            elif ThreadModel.objects.filter(user=receiver, receiver=request.user).exists():
                thread = ThreadModel.objects.filter(user=receiver, receiver=request.user)[0]
                return redirect('thread', pk=thread.pk)

            
            sender_thread = ThreadModel(user=request.user, receiver=receiver)

            sender_thread.save()
            thread_pk = sender_thread.pk

            return redirect('thread', pk=thread_pk)


        except:
            return JsonResponse({'message': 'This user does not exist'}, status=status.HTTP_404_NOT_FOUND)


class ListThreads(View):
    def get(self, request, *args, **kwargs):
        threads = ThreadModel.objects.filter(Q(user=request.user) | Q(receiver=request.user))

        threads_serializer = ThreadSerializer(threads, many=True)

        print(threads_serializer.data)

        return JsonResponse(threads_serializer.data, safe=False)


class CreateMessage(View):
    def post(self, request, pk, *args, **kwargs):
        thread = ThreadModel.objects.get(pk=pk)

        if thread.receiver == request.user:
            receiver = thread.user
        else:
            receiver = thread.receiver

        message = MessageModel(thread = thread, sender_user = request.user, receiver_user = receiver, body = JSONParser().parse(request)['body'],)

        message.save()

        return redirect('thread', pk=pk)


class ThreadView(View):
    def get(self, request, pk, *args, **kwargs):

        thread = ThreadModel.objects.get(pk=pk)

        thread_serializer = ThreadSerializer(thread)


        message_list = MessageModel.objects.filter(thread__pk__contains = pk)

        message_list_serializer = MessageSerializer(message_list, many = True)

        context = {
            'thread': thread_serializer.data,
            'message_list': message_list_serializer.data,
        }

        return JsonResponse(context, safe=False)

@api_view(['GET', 'POST', 'DELETE'])
def user_reactions_list(request, pk=""):
    if request.method == 'GET':
        print("getting reactions from user: " + pk)
        reactions_list = Reaction.objects.filter(user_id=pk)
        print(reactions_list)
        post_list = []

        for reaction in reactions_list:
            try:
                id = reaction.post_id.id
                post = Post.objects.get(pk=id)
                post_list.append(post)
            except Post.DoesNotExist:
                print("cannot find post :(")
    
        if not post_list:
            return JsonResponse({'message': 'User has not reacted to any posts'}, status=status.HTTP_404_NOT_FOUND)

        post_serializer = PostSerializer(post_list, many=True)
        return JsonResponse(post_serializer.data, safe=False)
#  ``   # GET list of comments, POST a new comment, DELETE all comment

# returns multiple comments based on post, returns all comments
@api_view(['GET', 'POST', 'DELETE'])
def post_comments_list(request, pk=""):
    if request.method == 'GET':
        print("getting comments from post: " + pk)

        comments_list = Comment.objects.filter(post_id=pk)

        comments_serializer = CommentSerializer(comments_list, many=True)
        return JsonResponse(comments_serializer.data, safe=False)
#  ``   # GET list of comments, POST a new comment, DELETE all comments

# returns multiple comments based on user, returns all comments
@api_view(['GET', 'POST', 'DELETE'])
def user_comments_list(request, pk=""):
    if request.method == 'GET':
        print("getting comments from user: " + pk)
        comments_list = Comment.objects.filter(user_id=pk)

        if not comments_list:
            return JsonResponse({'message': 'User has no comments'}, status=status.HTTP_404_NOT_FOUND)

        comments_serializer = CommentSerializer(comments_list, many=True)
        return JsonResponse(comments_serializer.data, safe=False)
#  ``   # GET list of comments, POST a new comment, DELETE all comments

# returns multiple comments based on user, returns all comments
# only returns non-anonymous comments
@api_view(['GET', 'POST', 'DELETE'])
def user_nonanon_comments_list(request, pk=""):
    if request.method == 'GET':
        print("getting only non-anonymous comments from user: " + pk)
        comments_list = Comment.objects.filter(user_id=pk, comment_is_anonymous=False)

        comments_serializer = CommentSerializer(comments_list, many=True)
        return JsonResponse(comments_serializer.data, safe=False)
#  ``   # GET list of comments, POST a new comment, DELETE all comments

@api_view(['GET', 'POST', 'DELETE'])
def comment_detail(request):
    
    if request.method == 'POST':
        comment_data = JSONParser().parse(request)
        print("from views.py comment_list POST:")
        print(comment_data)
        comment_serializer = CommentSerializer(data=comment_data)
        if comment_serializer.is_valid():
            comment_serializer.save()
            return JsonResponse(comment_serializer.data)
        message = ""
        for error in comment_serializer.errors:
            message = comment_serializer.errors[error][0].title()
        return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])  
def reaction_detail(request):
    
    if request.method == 'POST':
        reaction_data = JSONParser().parse(request)
        print("from views.py reaction_detail POST:")
        print(reaction_data)
        reaction_serializer = ReactionSerializer(data=reaction_data)
        if reaction_serializer.is_valid():
            reaction_serializer.save()
            return JsonResponse(reaction_serializer.data)
        message = ""
        for error in reaction_serializer.errors:
            message = reaction_serializer.errors[error][0].title()
        return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])  
def del_reaction(request, pk=""):

    if request.method == 'DELETE':
        print("from views.py reaction_detail DELETE")
        print(pk)
        reaction = Reaction.objects.get(pk=pk)
        reaction.delete() 
        return JsonResponse({'message': 'Reaction was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'DELETE'])
def post_reactions(request, pk=""):
    if request.method == 'GET':
        print("getting reactions from post: " + pk)
        reactions_list = Reaction.objects.filter(post_id=pk)

        if not reactions_list:
            return JsonResponse({'message': 'Post has no reactions'}, status=status.HTTP_404_NOT_FOUND)

        reactions_serializer = ReactionSerializer(reactions_list, many=True)
        return JsonResponse(reactions_serializer.data, safe=False)
