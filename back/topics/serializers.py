from .models import Topic, Action

from rest_framework import serializers
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer

class ActionSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    score = serializers.ReadOnlyField()
    image = serializers.FileField()

    class Meta:
        model = Action
        Fields = ('title', 'description', 'article_link', 'created_on', 'created_by', 'topic', 'tags', 'score', 'image')
        many = True

class TopicSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    score = serializers.ReadOnlyField()

    class Meta:
        model = Topic
        Fields = ('title', 'description', 'article_link', 'created_by', 'tags', 'score', 'image_url')
        many = True

class TopicDetailSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    score = serializers.ReadOnlyField()
    image = serializers.FileField()
    actions = ActionSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        Fields = ('title', 'article_link', 'created_by', 'created_on', 'tags', 'score', 'image', 'actions')
        many = True
