from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from rest_framework.response import Response
from django.http import JsonResponse
from .serializer import *
# Create your views here.


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        # print(request.data['username'])
        # print(request.data['password'])
        if serializer.is_valid():
            try:
                obj = User.objects.get(
                    username=request.data['username'], password=request.data['password'])
            except User.DoesNotExist:
                obj = User.objects.create()
            obj.__dict__.update(playlist=request.data['playlist'])
            obj.save()
            return Response(serializer.data)
