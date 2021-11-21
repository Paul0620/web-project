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
