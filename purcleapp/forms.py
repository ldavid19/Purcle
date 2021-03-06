from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.contrib.auth.models import User

from purcleapp.models import Post

class CustomUserCreationForm(UserCreationForm):    
    first_name = forms.CharField()
    last_name = forms.CharField()
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ('first_name','last_name', 'username', 'email', 'password1' ,'password2' )

class ThreadForm(forms.Form):

    username = forms.CharField(label='', max_length=100)

class MessageForm(forms.Form):

    message = forms.CharField(label='', max_length=200)

# class PostForm(forms.ModelForm):
#     class Meta:
#         model = Post
#         fields = '__all__'
    