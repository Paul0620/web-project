import re
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Post, PostImage, Comment


class AuthorSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    def avatar_url_field(self, author):
        if re.match(r"^http?://", author.avatar_url):
            return author.avatar_url

        if "request" in self.context:
            scheme = self.context["request"].scheme  # "http" or "https"
            host = self.context["request"].get_host()
            return scheme + "://" + host + author.avatar_url

    class Meta:
        model = get_user_model()
        fields = ["pk", "username", "nickname", "avatar_url"]


class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = PostImage
        fields = ["id", "image", "post"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    # 이미지를 가져올 떄 다중 업로드라 many옵션, 기본적으로 중첩된 serializer에서는 읽기, 수정이 불가하기에 read_only를 True를 줌
    images = serializers.SerializerMethodField("get_images")
    is_like = serializers.SerializerMethodField("is_like_field")

    def get_images(self, obj):
        image = obj.postimage_set.all()
        # 링크기능을 포함하고있는 이미지 주소를 뽑아낼라면 context를 사용하여야 함.
        # context를 제거하면 절대경로인 파일 위치 경로가 나타남 "media/diary/post/..."
        return PostImageSerializer(
            instance=image, many=True, context=self.context, read_only=True
        ).data

    # 게시물 생성
    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        # 이미지들을 for문을 통해 각각 처리
        images_data = self.context["request"].FILES.getlist("image")
        for image_data in images_data:
            PostImage.objects.create(post=post, image=image_data)
        return post

    # 게시물 수정
    def update(self, instance, validated_data):
        instance.caption = validated_data.get("caption", instance.caption)
        instance.location = validated_data.get("location", instance.location)

        images_data = self.context["request"].FILES.getlist("image")
        for image_data in images_data:
            PostImage.objects.update_or_create(post=instance, image=image_data)
        return super().update(instance, validated_data)

    def is_like_field(self, post):
        if "request" in self.context:
            user = self.context["request"].user
            return post.like_user_set.filter(pk=user.pk).exists()
        return False

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "images",
            "created_at",
            "updated_at",
            "caption",
            "location",
            # "tag_set",
            "is_like",
        ]


# 댓글기능
class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "author", "message", "created_at"]
