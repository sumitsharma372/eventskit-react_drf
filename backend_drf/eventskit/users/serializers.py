from rest_framework import serializers
from .models import CustomUser, Profile

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'email_verified')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data['password']
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()

        profile = Profile(user=instance)
        profile.save();
        return instance
    
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer();
    class Meta:
        model = Profile
        fields = ('id', 'user', 'bio', 'image')
        extra_kwargs = {'user': {'read_only': True}}