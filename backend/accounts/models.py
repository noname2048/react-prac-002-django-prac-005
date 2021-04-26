from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from django.shortcuts import resolve_url


class GenderChoices(models.TextChoices):
    MALE = "M", "남성"
    FEMALE = "F", "여성"


class User(AbstractUser):

    avatar = models.ImageField(
        blank=True,
        upload_to="accounts/profile/%y/%m/%d/%S",
        help_text="48px * 48px 크기의 png/jpg 파일을 업로드 해주세요.",
    )
    gender = models.CharField(max_length=1, blank=True, choices=GenderChoices.choices)
    phone_number = models.CharField(
        max_length=20,
        blank=True,
        validators=[RegexValidator(r"^01\d-?\d{3,4}-?\d{4}$")],
    )
    bio = models.TextField(blank=True)
    website_url = models.URLField(blank=True)

    # follew_set 유저가 팔로우 하는 사람들
    # follwer_set 유저를 팔로우 하는 사람들
    follow_set = models.ManyToManyField(
        "self", blank=True, symmetrical=False, related_name="follwer_set"
    )

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url("pydenticon_image", self.username)
