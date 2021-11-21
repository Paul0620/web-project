from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post, Comment, PostImage, Tag


# admin에서 볼때 스택형으로 표현되도록 설정
class PostImageAdmin(admin.StackedInline):
    model = PostImage


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [PostImageAdmin]  # PostImage와 연결
    list_display = ["id", "author", "caption"]
    list_display_links = ["caption"]


@admin.register(PostImage)
class PostImageAdmin(admin.ModelAdmin):
    list_display = ["post", "image_tag"]
    list_display_links = ["post"]

    def image_tag(self, post):
        return mark_safe(
            f"<img src={post.image.url} style='width: 50px;' />"
        )  # 안전한 입력값이라고 인식시키기 위해 mark_safe사용 그렇지 않으면 문자형태로 출력됨


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass
