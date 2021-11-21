import re
from django.conf import settings
from django.db import models
from django.urls import reverse


# 모든 모델에서는 생성, 업데이트가 필요해서 따로 빼서 독립적으로 만듬
class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True  # 추상클래스로 허용


# 게시글
class Post(TimestampedModel):
    author = models.ForeignKey(  # 유저 외래키
        settings.AUTH_USER_MODEL, related_name="my_post_set", on_delete=models.CASCADE
    )
    caption = models.CharField(max_length=500)
    tag_set = models.ManyToManyField("Tag", blank=True)
    location = models.CharField(max_length=100)
    like_user_set = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name="like_post_set"
    )

    def __str__(self):
        return self.caption

    def extract_tag_list(self):
        tag_name_list = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", self.caption)
        tag_list = []
        for tag_name in tag_name_list:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            tag_list.append(tag)
        return tag_list

    def get_absolute_url(self):
        return reverse("diary:post_detail", args=[self.pk])

    def is_like_user(self, user):
        return self.like_user_set.filter(pk=user.pk).exists()

    class Meta:
        ordering = ["-id"]


# 다중 이미지를 위한 별도의 이미지 클래스처리
class PostImage(TimestampedModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="diary/post/%Y/%m/%d")


# 댓글
class Comment(TimestampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ["-id"]


# 태그
class Tag(TimestampedModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
