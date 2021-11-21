from rest_framework import serializers
from .models import Post, PostImage


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ["id", "image", "post"]


class PostSerializer(serializers.ModelSerializer):
    # 이미지를 가져올 떄 다중 업로드라 many옵션, 기본적으로 중첩된 serializer에서는 읽기, 수정이 불가하기에 read_only를 True를 줌
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        image = obj.postimage_set.all()
        # 링크기능을 포함하고있는 이미지 주소를 뽑아낼라면 context를 사용하여야 함.
        # context를 제거하면 절대경로인 파일 위치 경로가 나타남 "media/diary/post/..."
        return PostImageSerializer(instance=image, many=True, context=self.context).data

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "images",
            "created_at",
            "caption",
            "location",
            "tag_set",
            # "is_like",
        ]

    # 이미지들을 해당 게시물에 맞는 이미지를 리턴
    def create(self, validated_data):
        images_data = self.context["request"].FILES
        post = Post.objects.create(**validated_data)
        for image_data in images_data.getlist("photo"):
            PostImage.objects.create(post=post, image=image_data)
        return post
