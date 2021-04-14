from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


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
    follwer_set = models.ManyToManyField(
        "self", blank=True, symmetrical=False, related_name="following_set"
    )

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def avatar_url(self):
        if self.avatar:
            return
