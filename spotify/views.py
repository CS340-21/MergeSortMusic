from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import *


class AuthURL(APIView):
    def get(self, request, fornat=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)


def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('/user')


class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(
            self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)


class GetPlaylists(APIView):
    def get(self, request, format=None):
        # Send request to Spotify for user's playlists.
        host = self.request.session.session_key
        endpoint = "playlists"
        response = execute_user_spotify_api_request(host, endpoint)

        # Return 204 if error.
        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        # Get list of playlists.
        items = response.get('items')

        # Return 204 if user has no playlists.
        if not items:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        # Collect playlist information into a list.
        playlists = []
        for item in items:
            playlist = {
                'playlist_id': item.get('id'),
                'name': item.get('name'),
                'tracks_total': item.get('tracks').get('total'),
            }
            playlists.append(playlist)

        return Response(playlists, status=status.HTTP_200_OK)


class GetPlaylistInfo(APIView):
    def get(self, request, playlist_id, format=None):
        playlist_info = get_playlist_info(self, playlist_id)

        if playlist_info is None:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(playlist_info, status=status.HTTP_200_OK)


class PutPlaylistInfo(APIView):
    def put(self, request, playlist_id, insert_before, range_length, range_start, format=None):
        print(playlist_id, insert_before, range_length, range_start)
        print("------------------------------------------------------------")
        response = put_playlist_info(self, playlist_id, insert_before,
                                     range_length, range_start)
        return Response({}, status=response.status_code)
