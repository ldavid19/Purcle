from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Topic)
admin.site.register(Post)
admin.site.register(Reaction)
admin.site.register(Comment)