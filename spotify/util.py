from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get


BASE_URL_ME = "https://api.spotify.com/v1/me/"
BASE_URL_GEN = "https://api.spotify.com/v1/"


def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)

    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token',
                                   'refresh_token', 'expires_in', 'token_type'])
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token,
                              refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()


def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)

        return True

    return False


def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_or_create_user_tokens(
        session_id, access_token, token_type, expires_in, refresh_token)


def execute_user_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_id)
    headers = {'Content-Type': 'application/json',
               'Authorization': "Bearer " + tokens.access_token}

    if post_:
        post(BASE_URL_ME + endpoint, headers=headers)
    if put_:
        put(BASE_URL_ME + endpoint, headers=headers)

    response = get(BASE_URL_ME + endpoint, {}, headers=headers)
    try:
        return response.json()
    except:
        return {'Error': 'Issue with request'}


def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_id)
    headers = {'Content-Type': 'application/json',
               'Authorization': "Bearer " + tokens.access_token}

    if post_:
        post(BASE_URL_GEN + endpoint, headers=headers)
    if put_:
        put(BASE_URL_GEN + endpoint, headers=headers)

    response = get(BASE_URL_GEN + endpoint, {}, headers=headers)
    try:
        return response.json()
    except:
        return {'Error': 'Issue with request'}


def play_song(session_id):
    return execute_user_spotify_api_request(session_id, "player/play", put_=True)


def pause_song(session_id):
    return execute_user_spotify_api_request(session_id, "player/pause", put_=True)


def skip_song(session_id):
    return execute_user_spotify_api_request(session_id, "player/next", post_=True)


def get_playlist_info(self, playlist_id):
    # Send request to Spotify for user's playlists.
    host = self.request.session.session_key
    endpoint = f'playlists/{playlist_id}'
    response = execute_spotify_api_request(host, endpoint)

    # Return 204 if error.
    if 'error' in response or 'tracks' not in response:
        return None

    # Get list of playlists.
    items = response.get('tracks').get('items')

    # Return 204 if user has no playlists.
    if not items:
        return None

    # Collect playlist information into a list.
    tracks = []
    for item in items:
        artist_string = ""
        for i, artist in enumerate(item.get('track').get('artists')):
            if i > 0:
                artist_string += ", "
            name = artist.get('name')
            artist_string += name

        track = {
            'album': item.get('track').get('album').get('name'),
            'artist': artist_string,
            'track_id': item.get('track').get('id'),
            'track_name': item.get('track').get('name'),
        }
        tracks.append(track)

    playlist = {
        'id': response.get('id'),
        'name': response.get('name'),
        'num_tracks': response.get('tracks').get('total'),
        'tracks': tracks,
    }

    return playlist
