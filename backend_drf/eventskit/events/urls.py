from rest_framework import routers
from .views import EventViewSet, LikeAPIView, LikesAllAPIView
from django.urls import path, include

router = routers.DefaultRouter()
router.register('', EventViewSet, 'events')
urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/like/', LikeAPIView.as_view()),
]