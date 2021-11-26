from django.db.models import Q
from rest_framework.viewsets import ModelViewSet
from django.utils import timezone
from datetime import timedelta
from rest_framework.permissions import AllowAny
from .models import Post
from .serializers import PostSerializer


# CRUD기능이 다들어간 ModelViewSet
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
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
