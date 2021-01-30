from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('sorter/', include('sorter.urls')),
    path('admin/', admin.site.urls),
]