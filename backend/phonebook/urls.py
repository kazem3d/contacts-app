from django.contrib import admin
from django.urls import path,include

from .apis.contacts import ListContactsAPIView


urlpatterns = [
    path('contacts-list/', ListContactsAPIView.as_view(), name='contacts-list'),

]