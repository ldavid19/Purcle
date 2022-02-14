from django.shortcuts import render
from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
# Create your views here.
  
class ReactView(APIView):
    
    serializer_class = ReactSerializer

    def get(self, request):
        detail = [ {"user_email": detail.user_email} 
        for detail in User.objects.all()]
        return Response(detail)
  
    def post(self, request):
  
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            
            return  Response(serializer.data)

