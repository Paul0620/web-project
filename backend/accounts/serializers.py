import re
from rest_framework import serializers
from django.contrib.auth import get_user_model


# Serialize(직렬화) - 쿼리셋,모델 인스턴스 등의 complex type(복잡한 데이터)를 JSON, XML등의 컨텐트 타입으로 쉽게 변환 가능한 python datatype으로 변환시켜줌
User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    # 암호화가 되어서 저장될 수 있도록
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["pk", "username", "password", "nickname"]

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"], nickname=validated_data["nickname"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


# 회원정보
class UserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    def avatar_url_field(self, author):
        if re.match(r"^http?://", author.avatar_url):
            return author.avatar_url

        if "request" in self.context:
            scheme = self.context["request"].scheme  # "http" or "https"
            host = self.context["request"].get_host()
            return scheme + "://" + host + author.avatar_url

    class Meta:
        model = User
        fields = ["pk", "username", "nickname", "avatar_url", "bio"]


# 추천친구리스트
class SuggestionUserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    def avatar_url_field(self, author):
        if re.match(r"^http?://", author.avatar_url):
            return author.avatar_url

        if "request" in self.context:
            scheme = self.context["request"].scheme  # "http" or "https"
            host = self.context["request"].get_host()
            return scheme + "://" + host + author.avatar_url

    class Meta:
        model = User
        fields = ["nickname", "avatar_url"]
