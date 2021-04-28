from datetime import timedelta

from django.db.models import Q
from django.shortcuts import render
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from instagram.models import Comment, Post
from instagram.serializers import CommentSerializer, PostSerializer


class PostViewSet(ModelViewSet):
    queryset = (
        Post.objects.all()
        .select_related("user")
        .prefetch_related("tag_set", "like_user_set")
    )
    serializer_class = PostSerializer
    # permission_classes = [AllowAny]  # FIXME: 인증 적용

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_queryset(self):

        qs = super().get_queryset()

        # timesince = timezone.now() - timedelta(days=3)
        # qs = qs.filter(created_at__gte=timesince)

        qs = qs.filter(
            Q(user=self.request.user)
            | Q(user__in=self.request.user.following_set.all())
        )

        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)

    @action(detail=True, methods=["POST"])
    def like(self, request, pk):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs["post_pk"])
        serializer.save(user=self.request.user, post=post)
        return super().perform_create(serializer)
