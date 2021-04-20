from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from spotify.util import get_playlist_info
from django.urls import reverse

# Create your views here.


class ImportPlaylist(APIView):
    def post(self, request, playlist_id, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        playlist = get_playlist_info(self, playlist_id)

        new_sort_instance = SortInstance(user=self.request.session.session_key,
                                         title=playlist['name'], num_songs=playlist['num_tracks'])
        new_sort_instance.save()

        for track in playlist['tracks']:
            new_song = Song(sort_instance=new_sort_instance, name=track['track_name'],
                            artist=track['artist'], album=track['album'], spotify_id=track['track_id'])
            new_song.save()

        return Response({}, status.HTTP_204_NO_CONTENT)


class GetSortInstances(APIView):
    serializer_class = SortInstanceSerializer

    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        sort_instances = SortInstance.objects.filter(
            user=self.request.session.session_key)
        if sort_instances:
            data = SortInstanceSerializer(sort_instances, many=True).data
            return Response(data, status=status.HTTP_200_OK)

        return Response({'Sort Instances Not Found': 'No sort instances found for this session.'}, status=status.HTTP_404_NOT_FOUND)


class DeleteAllSortInstances(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        sort_instances = SortInstance.objects.filter(
            user=self.request.session.session_key)
        if sort_instances:
            sort_instances.delete()
            return Response({}, status.HTTP_204_NO_CONTENT)

        return Response({'Nothing to Delete': 'No sort instances found.'}, status=status.HTTP_404_NOT_FOUND)


class DeleteSortInstance(APIView):
    def post(self, request, si_id, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        sort_instance = SortInstance.objects.filter(id=si_id)
        if sort_instance:
            sort_instance.delete()
            return Response({}, status.HTTP_204_NO_CONTENT)

        return Response({'Nothing to Delete': 'Specified sort instance not found.'}, status=status.HTTP_404_NOT_FOUND)


class PlaylistInfo(generics.ListAPIView):
    ##queryset = PlaylistItems.objects.all()
    serializer_class = PlaylistInfoSerializer

    def get_queryset(self):
        id = self.request.path.split("/")[-1]
        return PlaylistItems.objects.filter(playlist_id=id)

    def post(self, request, playlist_id, format=None):
        id = request.path.split("/")[-1]
        try:
            playlist = PlaylistItems.objects.get(playlist_id=id)
            playlist.delete()
        except PlaylistItems.DoesNotExist:
            playlist = None

        serializer = PlaylistInfoSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
