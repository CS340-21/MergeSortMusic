from django.contrib import admin

# Register your models here.
from .models import Room, SortInstance, Song

admin.site.register(SortInstance)
admin.site.register(Song)