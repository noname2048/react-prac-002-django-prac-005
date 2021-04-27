from django.contrib.auth import get_user_model

from rest_framework import serializers

from instagram.models import Post

User = get_user_model()


class SubUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


class UserSerializer(serializers.ModelSerializer):
    following_set = SubUserSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "name",
            "avatar_url",
            "last_login",
            "is_active",
            "following_set",
        ]


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = "__all__"
