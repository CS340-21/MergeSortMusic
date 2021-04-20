from django.urls import path
from .views import *

urlpatterns = [
    path('import-playlist/<str:playlist_id>', ImportPlaylist.as_view()),
    path('playlist-info/<str:playlist_id>', PlaylistInfo.as_view()),
    path('get-sort-instances', GetSortInstances.as_view()),
    path('delete-all-sort-instances', DeleteAllSortInstances.as_view()),
    path('delete-sort-instance/<str:si_id>', DeleteSortInstance.as_view())
]
