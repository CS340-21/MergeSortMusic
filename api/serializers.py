from rest_framework import serializers
from .models import SortInstance, PlaylistItems


class SortInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SortInstance
        fields = ('id', 'title', 'num_songs')


class PlaylistInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistItems
        fields = ['playlist_id', 'items']
