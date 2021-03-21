from django.db import models
from django.utils.crypto import get_random_string


def generate_unique_code():
    length = 6

    while True:
        code = get_random_string(
            length=length, allowed_chars='ABCDEFGHJKLMNPQRSTUVWXYZ')
        if not Room.objects.filter(code=code).exists():
            break

    return code


class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    current_song = models.CharField(max_length=50, null=True)


class SortInstance(models.Model):
    user = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    num_songs = models.IntegerField(default=1)


class Song(models.Model):
    sort_instance = models.ForeignKey(SortInstance, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    album = models.CharField(max_length=200)
    spotify_id = models.CharField(max_length=30)

