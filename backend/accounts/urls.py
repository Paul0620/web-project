from django.urls import path
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)
from . import views


urlpatterns = [
    path("signup/", views.SignupView.as_view(), name="login"),
    path("token/", obtain_jwt_token),  # 토큰을 가져오는 url
    path("token/refresh/", refresh_jwt_token),  # 접속 토큰이 만료되었을 때, 다시 발행하기 위한 용도
    path("token/verify/", verify_jwt_token),  # 토큰 검증을 이용할때 활용
    path(
        "suggestions/",
        views.SuggestionListAPIView.as_view(),
        name="suggestion_user_list",
    ),
    path("follow/", views.user_follow, name="user_follow"),
    path("unfollow/", views.user_unfollow, name="user_unfollow"),
]
