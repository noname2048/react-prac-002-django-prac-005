import re
from django.contrib.auth import get_user_model

from rest_framework import serializers

from instagram.models import Post, Comment

User = get_user_model()


class SubUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


class UserSerializer(serializers.ModelSerializer):
    following_set = SubUserSerializer(many=True, read_only=True)
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    def avatar_url_field(self, user):
        if re.match(r"^https?://", user.avatar_url):
            return user.avatar_url

        if "request" in self.context:
            scheme = self.context["request"].scheme
            host = self.context["request"].get_host()
            return scheme + "://" + host + user.avatar_url

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

    is_like = serializers.SerializerMethodField("is_like_field")

    def is_like_field(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.like_user_set.filter(pk=user.pk).exists()

        return False

    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "created_at",
            "photo",
            "caption",
            "location",
            "tag_set",
            "is_like",
        ]


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "user", "message", "created_at"]
