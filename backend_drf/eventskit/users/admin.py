from django.contrib import admin
from .models import CustomUser, Profile

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'email_verified')
admin.site.register(CustomUser, UserAdmin)

admin.site.register(Profile)