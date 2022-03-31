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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('signup/', TemplateView.as_view(template_name='index.html')),
    #path('login/', TemplateView.as_view(template_name='index.html')),
    path('following/', TemplateView.as_view(template_name='index.html')),
    re_path(r'^profile/(?P<pk>[0-9]+)$', TemplateView.as_view(template_name='index.html')),
    re_path(r'^api/profile/(?P<pk>[0-9]+)$', views.profile_detail),
    re_path(r'^api/profilesetup/(?P<pk>[0-9]+)$', views.profile_detail),
    re_path(r'^api/posts/((?P<pk>[0-9a-zA-Z_]+)?)$', views.posts_list), # grabs multiple posts based on topic
    re_path(r'^api/user_posts/((?P<pk>[0-9a-zA-Z_]+)?)$', views.user_posts_list), # grabs multiple posts based on user_id
    re_path(r'^api/post/((?P<pk>[0-9a-zA-Z_]+)?)$', views.post_detail), # grabs single post based on id
    #path('api/profile/', views.profile_detail),
    re_path(r'^api/profile_update/(?P<pk>[0-9]+)$', views.profile_update),
    #re_path(r'^api/post$', views.posts_list),
    re_path(r'^api/topic$', views.topic_list),
    re_path(r'^api/topic/(?P<pk>[0-9]+)$', views.topic_detail), # id is char not int
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('profilesetup/', TemplateView.as_view(template_name='index.html')),
    path('messages/', TemplateView.as_view(template_name='index.html')),
    #path('post/', views.posts_list),
    path('post/:id', TemplateView.as_view(template_name='index.html')),
    #path('profile/:id', TemplateView.as_view(template_name='index.html')),
    #path('api/sign_up/', views.SignUpView.as_view(), name='sign_up'),
    path('api/auth/login/', views.LoginAPI.as_view(), name='login'),
    #path('api/auth/register/', views.RegisterAPI.as_view(), name='register'),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/auth/', include('knox.urls')),
    path('api/current_user', views.curr_user),
    
    #path('api/sign_up/', views.SignUpView.as_view(), name='sign_up'),
    path('api/sign_up/', views.user_detail),
    #path('api/auth/register/', include('rest_auth.registration.urls')),
    # path(r'^', include('Purcle.urls')),
]
