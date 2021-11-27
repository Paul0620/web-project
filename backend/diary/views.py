from django.db.models import Q
from rest_framework.generics import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response

# from django.utils import timezone
# from datetime import timedelta
# from rest_framework.permissions import AllowAny
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


# CRUD기능이 다들어간 ModelViewSet
class PostViewSet(ModelViewSet):
    queryset = (
        Post.objects.all()
        .select_related("author")
        .prefetch_related("tag_set", "like_user_set")
    )
    serializer_class = PostSerializer
    # permission_classes = [AllowAny]  # 누구라도 접근할 수 있도록 설정, 인증적용시 추후에 제거

    # get_queryset 재정의
    def get_queryset(self):
        # 작성일이 언제전인지 알기위한 시간설정
        # timesince = timezone.now() - timedelta(days=3)
        qs = super().get_queryset()
        qs = qs.filter(
            # 로그인 유저가 작성한 글이나 유저가 팔로우한 친구의 post만 리턴
            Q(author=self.request.user)
            | Q(author__in=self.request.user.following_set.all())
        )
        # qs = qs.filter(created_at__gte=timesince)
        return qs

    # 부모가 작성한 context를 가져와서 반환
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    # 게시물 작성 재정의
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        return super().perform_create(serializer)

    # 좋아요 기능
    @action(detail=True, methods=["POST"])  # 특정 포스트를 정하기 위해 detail=True
    def like(self, request, pk):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    # 좋아요 취소
    @like.mapping.delete  # 좋아요를 누른 특정 포스트를 매핑하여 제거
    def unlike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)


# 댓글
class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    # 지정한 포스트의 값에 댓글을 작성하기 위해
    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    # 게시물 작성 재정의(댓글을 남기고 난 뒤의 내용으로 바꾸기 위해)
    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs["post_pk"])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)
