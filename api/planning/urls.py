from django.urls import path
from planning.views import home

urlpatterns = [
    path('', home, name='index')
]
