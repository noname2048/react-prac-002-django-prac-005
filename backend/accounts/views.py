from django.contrib.auth import get_user_model
from django.shortcuts import render

from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny

from accounts.serializers import SignupSerializer, SuggetionUserSerializer


class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [
        AllowAny,
    ]


class SuggestionListApIView(ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = SuggetionUserSerializer
