import re

from django.conf import settings
from django.db import models
from django.db.models.deletion import CASCADE
from django.shortcuts import resolve_url

AUTH_USER_MODEL = settings.AUTH_USER_MODEL
MODEL_CASCADE = models.deletion.CASCADE


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Post(TimeStampedModel):
    user = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=MODEL_CASCADE,
        related_name="post_set",
    )
    photo = models.ImageField(upload_to="instagram/post/%Y/%m/%d")
    caption = models.CharField(max_length=500)
    tag_set = models.ManyToManyField("Tag", blank=True)
    location = models.CharField(max_length=100)
    like_user_set = models.ManyToManyField(
        AUTH_USER_MODEL, blank=True, related_name="like_post_set"
    )

    def __str__(self):
        return self.caption

    def get_absolute_url(self):
        return resolve_url("instagram:posts_detail", self.pk)

    def extract_tags(self):
        """
        Makes Tag object from captions

        post.extract_tags() -> list of tag objs
        """
        tag_names = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", self.caption)
        tag_objs = list()

        for tag_name in tag_names:
            tag_obj, _ = Tag.objects.get_or_create(name=tag_name)
            tag_objs.append(tag_obj)

        return tag_objs

    def is_user_like(self, user):
        """
        Use want to know about user likes this post

        post.is_user_like(user)
        """
        return self.like_user_set.filter(pk=user.pk).exists()

    class Meta:
        ordering = ["-id"]


class Comment(TimeStampedModel):
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=MODEL_CASCADE)
    post = models.ForeignKey(Post, on_delete=MODEL_CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ["-id"]


class Tag(TimeStampedModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
