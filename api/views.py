from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from spotify.util import get_playlist_info

# Create your views here.


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if room.exists():
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if room_result.exists():
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key

            room, created = Room.objects.update_or_create(
                host=host,
                defaults=dict(guest_can_pause=guest_can_pause,
                              votes_to_skip=votes_to_skip)
            )

            self.request.session['room_code'] = room.code
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)


class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room_results = Room.objects.filter(host=host_id)
            if room_results.exists():
                room = room_results[0]
                room.delete()

        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)


class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')

            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({'msg': 'Room not found.'}, status=status.HTTP_404_NOT_FOUND)

            room = queryset[0]
            user_id = self.request.session.session_key
            if room.host != user_id:
                return Response({'msg': 'You are not the host of this room.'}, status=status.HTTP_403_FORBIDDEN)

            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)


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
