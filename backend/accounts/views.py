import random
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    get_object_or_404,
)
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .serializers import (
    SignupSerializer,
    UserSerializer,
    SuggestionUserSerializer,
)


# 회원가입
class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]


# 회원정도
class UserView(RetrieveAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


# 추천친구리스트
class SuggestionListAPIView(ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = SuggestionUserSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        # 제외 조건을 통해 팔로우 가능한 친구 리스트를 보여줌
        qs = qs.exclude(pk=self.request.user.pk)  # 접속중인 유저와 같은 정보인 유저는 안보이게
        qs = qs.exclude(
            pk__in=self.request.user.following_set.all()
        )  # 팔로윙에 있는 친구는 안보이게
        return qs


# 팔로우에 따른 리스트
@api_view(["POST"])
def user_follow(request):
    nickname = request.data.get("nickname")
    follow_user = get_object_or_404(get_user_model(), nickname=nickname, is_active=True)
    request.user.following_set.add(follow_user)  # 로그인 유저 following에 팔로우한 유저 추가
    follow_user.follower_set.add(request.user)  # 대상 유저에게는 follower에 로그인 유저 추가
    return Response(status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def user_unfollow(request):
    nickname = request.data.get("nickname")
    follow_user = get_object_or_404(get_user_model(), nickname=nickname, is_active=True)
    request.user.following_set.remove(follow_user)  # 로그인 유저 following에 팔로우한 유저 추가
    follow_user.follower_set.remove(request.user)  # 대상 유저에게는 follower에 로그인 유저 추가
    return Response(status.HTTP_204_NO_CONTENT)
