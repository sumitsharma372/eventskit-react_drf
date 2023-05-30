from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from .models import Event, Like
from .serializers import EventSerializer, LikeSerializer
from rest_framework import permissions,status
from rest_framework.response import Response

# Create your views here.


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class LikesAllAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        likes = Like.objects.all()
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LikeAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk, *args, **kwargs):
        event = Event.objects.get(pk=pk)
        if event is None:
            return Response ({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)
        
        likers = Like.objects.filter(event = pk).values_list('user', flat = True)
        if request.user.id in likers:
            event.likecount -= 1
            Like.objects.filter(user = request.user, event = event).delete()
        else:
            event.likecount += 1
            like = Like.objects.create(user = request.user, event = event)
            like.save();
        event.save()
        serializer = EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)