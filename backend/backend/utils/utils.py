import os
import json
from django.core.exceptions import ImproperlyConfigured

# secrets.json에서 키값을 가져와서 base.py로 보냄
_secrets = None


def load_secrets():
    global _secrets

    with open(
        os.path.join(
            os.path.dirname(
                os.path.dirname(os.path.dirname((os.path.abspath(__file__))))
            ),
            "_secrets.json",
        ),
        "r",
    ) as f:
        _secrets = json.loads(f.read())


def get_secret(key):
    global _secrets

    if _secrets is None:
        load_secrets()

    try:
        return _secrets[key]
    except KeyError:
        raise ImproperlyConfigured(f"Secret variable {key} does not exists.")
