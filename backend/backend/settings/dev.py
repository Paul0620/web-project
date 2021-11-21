from .base import *

INSTALLED_APPS += [
    "debug_toolbar",  # debug_toolbar에 대한 설정
]

MIDDLEWARE = [
    "debug_toolbar.middleware.DebugToolbarMiddleware",  # debug_toolbar에 대한 설정
] + MIDDLEWARE

# debug toolbar를 허용할 ip 설정
INTERNAL_IPS = ["127.0.0.1"]

# 리엑트로 api를 넘기기 위한 설정, 개발환경에서만 사용하기위해서 dev.py에서 설정
CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.mysql",
#         "NAME": "diary",
#         "USER": "root",
#         "PASSWORD": "0620",
#         "HOST": "localhost",
#         "PORT": "3306",
#     }
# }
