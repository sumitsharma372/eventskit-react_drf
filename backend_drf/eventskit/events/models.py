from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
# Create your models here.

class Event(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event_name = models.CharField(max_length=255, null=False, blank= False)
    data = models.TextField(null=False)
    time = models.DateTimeField(null=False)
    image = models.ImageField(upload_to= 'images', null=True)
    location = models.CharField(max_length=255)
    isLiked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    likecount = models.IntegerField(default = 0, validators=[MinValueValidator(0)])

    class Meta: 
        db_table = 'events'

    def __str__(self):
        return self.event_name
    
class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='likes')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='likes')