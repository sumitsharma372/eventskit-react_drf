from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from events.views import LikesAllAPIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path("api/users/", include("users.urls")),
    path("api/events/", include('events.urls')),
    path("api/event-likes/", LikesAllAPIView.as_view())
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
