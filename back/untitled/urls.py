"""untitled URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from topics import api

from rest_framework.urlpatterns import format_suffix_patterns
from updown.views import AddRatingFromModel

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/topics/$', api.TopicList.as_view()),
    url(r'^api/topics/submit$', api.TopicPost.as_view()),
    url(r'^api/topics/(?P<pk>[0-9]+)/$', api.TopicDetail.as_view()),
    url(r'^api-token-auth/', 'rest_framework_jwt.views.obtain_jwt_token'),
    url(r'^api/topics/(?P<object_id>\d+)/rate/(?P<score>[\d\-]+)$', AddRatingFromModel(), {
        'app_label': 'topics',
        'model': 'Topic',
        'field_name': 'rating',
    }, name="topic_rating"),
]
