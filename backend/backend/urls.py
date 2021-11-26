from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django_pydenticon.views import image as pydenticon_image

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("diary.urls")),
    path("accounts/", include("accounts.urls")),
    path("identicon/image/<path:data>.png", pydenticon_image, name="pydenticon_image"),
]

# 개발상태일때만 사용 가능, 프로덕션으로 내놓을 경우에는 DEBUG가 false라 사용하지 못함
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    import debug_toolbar

    urlpatterns += [
        path("__debug__/", include(debug_toolbar.urls)),
    ]
