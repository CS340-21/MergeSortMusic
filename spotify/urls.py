from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('get-playlists', GetPlaylists.as_view()),
    path('get-playlist-info/<str:playlist_id>', GetPlaylistInfo.as_view()),
    path('rearrange-playlist/<str:playlist_id>/<int:insert_before>/<int:range_length>/<int:range_start>',
         PutPlaylistInfo.as_view())
]
