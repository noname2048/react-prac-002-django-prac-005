from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from accounts.serializers import SignupSerializer, SuggetionUserSerializer

User = get_user_model()


class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [
        AllowAny,
    ]


class SuggestionListApIView(ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = SuggetionUserSerializer


@api_view(["POST"])
def user_follow(request):
    username = request.data["username"]
    user = request.user

    target_user = get_object_or_404(User, username=username, is_active=True)
    user.following_set.add(target_user)
    target_user.follower_set.add(user)
    return Response(status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def user_unfollow(request):
    username = request.data["username"]
    user = request.user

    target_user = get_object_or_404(User, username=username, is_active=True)
    user.following_set.remove(target_user)
    target_user.follower_set.remove(user)
    return Response(status.HTTP_204_NO_CONTENT)
