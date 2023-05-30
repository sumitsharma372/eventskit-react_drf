from rest_framework import serializers
from .models import Event, Like

#? Creating a serializer for the Event model

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = Like
        fields = ('id', 'user', 'event')