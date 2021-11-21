from django.urls.conf import include, path
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


# 라우터에 PostViewSet을 등록해줌 이름은 posts라 지정
router = DefaultRouter()
router.register("posts", views.PostViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
