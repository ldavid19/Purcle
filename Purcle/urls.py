"""Purcle URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views

from knox import views as knox_views

#from rest_auth import urls

from purcleapp import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),

    #REACT ROUTES
    path('signup/', TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('following/', TemplateView.as_view(template_name='index.html')),
    path('profilesetup/', TemplateView.as_view(template_name='index.html')),
    path('messages/', TemplateView.as_view(template_name='index.html')),
    path('inbox/', TemplateView.as_view(template_name='index.html')),
    path('error/', TemplateView.as_view(template_name='index.html')),

    #REACT ROUTES REGEX
    re_path(r'^profile/(?P<pk>[0-9]+)$', TemplateView.as_view(template_name='index.html')),
    re_path(r'^topic/((?P<pk>[0-9a-zA-Z_]+)?)$', TemplateView.as_view(template_name='index.html')), # id is char not int
    re_path(r'^post/(?P<pk>[0-9]+)$', TemplateView.as_view(template_name='index.html')),
    re_path(r'^comment/(?P<pk>[0-9]+)$', TemplateView.as_view(template_name='index.html')),
    re_path(r'^inbox/(?P<pk>[0-9]+)$', TemplateView.as_view(template_name='index.html')),
    
    #API CALLS
    #--auth--
    path('api/auth/login/', views.LoginAPI.as_view(), name='login'),
    #path('api/auth/register/', views.RegisterAPI.as_view(), name='register'),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/sign_up/', views.user_detail),
    path('api/auth/', include('knox.urls')),
    
    #--profile--
    re_path(r'^api/profile/(?P<pk>[0-9]+)$', views.profile_detail),
    re_path(r'^api/userprofile_id/((?P<pk>[0-9a-zA-Z_]+)?)$', views.userprofile_detail),
    re_path(r'^api/profileid/(?P<pk>[0-9]+)$', views.profile_id),
    re_path(r'^api/profilesetup/(?P<pk>[0-9]+)$', views.profile_detail),
    re_path(r'^api/profile_update/(?P<pk>[0-9]+)$', views.profile_update),

    #--posts--
    re_path(r'^api/postlist/$', views.post_list),
    re_path(r'^api/post/((?P<pk>[0-9a-zA-Z_]+)?)$', views.post_detail), # grabs single post based on id
    re_path(r'^api/posts/((?P<pk>[0-9a-zA-Z_]+)?)$', views.posts_list), # grabs multiple posts based on topic
    re_path(r'^api/user_posts/((?P<pk>[0-9a-zA-Z_]+)?)$', views.user_posts_list), # grabs multiple posts based on user_id
    
    #--topics--
    re_path(r'^api/topiclist/$', views.topic_list),
    re_path(r'^api/topic/((?P<pk>[0-9a-zA-Z_]+)?)$', views.topic_detail), # id is char not int
    re_path(r'^api/topic_update/((?P<pk>[0-9a-zA-Z_]+)?)$', views.topic_update), # id is char not int

    #--comments--
    re_path(r'^api/comment/$', views.comment_detail),
    re_path(r'^api/post_comments/((?P<pk>[0-9a-zA-Z_]+)?)$', views.post_comments_list), # grabs multiple comments based on post
    re_path(r'^api/user_comments/((?P<pk>[0-9a-zA-Z_]+)?)$', views.user_comments_list), # grabs multiple comments based on user
    re_path(r'^api/user_nonanon_comments/((?P<pk>[0-9a-zA-Z_]+)?)$', views.user_nonanon_comments_list), # grabs multiple comments based on user
                                                                                                        # but only ones which aren't anonymous
    #--reactions--
    re_path(r'^api/user_reactions/((?P<pk>[0-9a-zA-Z_]+)?)$', views.user_reactions_list), # grabs multiple comments based on user
    re_path(r'^api/reaction/$', views.reaction_detail), # post for individual reaction
    re_path(r'^api/del_reaction/((?P<pk>[0-9a-zA-Z_]+)?)$', views.del_reaction), # delete a specific reaction
    re_path(r'^api/post_reactions/((?P<pk>[0-9a-zA-Z_]+)?)$', views.post_reactions), # grabs multiple reactions based on post

    #--misc--
    path('api/current_user', views.curr_user),
    path('api/userlist/', views.user_list),
    re_path(r'^api/convert/((?P<pk>[0-9a-zA-Z_]+)?)$', views.convert),

    #--dm--
    path('api/inbox/', views.ListThreads.as_view(), name='inbox'),
    path('api/create-thread/', views.CreateThread.as_view(), name='create-thread'),
    re_path(r'^api/inbox/(?P<pk>[0-9]+)$', views.ThreadView.as_view(), name='thread'),
    re_path(r'^api/create-message/(?P<pk>[0-9]+)$', views.CreateMessage.as_view(), name='create-message'),

    #path('api/sign_up/', views.SignUpView.as_view(), name='sign_up'),
    #path('api/auth/register/', include('rest_auth.registration.urls')),
    # path(r'^', include('Purcle.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
