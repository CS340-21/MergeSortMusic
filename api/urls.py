from django.urls import path
from .views import *

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoom.as_view()),
    path('import-playlist/<str:playlist_id>', ImportPlaylist.as_view()),
    path('get-sort-instances', GetSortInstances.as_view()),
    path('delete-all-sort-instances', DeleteAllSortInstances.as_view()),
    path('delete-sort-instance/<str:si_id>', DeleteSortInstance.as_view()),
    path('get-tracks/<str:si_id>', GetTracks.as_view())
]
