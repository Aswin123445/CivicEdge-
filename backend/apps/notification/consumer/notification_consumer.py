from channels.generic.websocket import AsyncWebsocketConsumer
from urllib.parse import parse_qs
from channels.db import database_sync_to_async
import json
import logging


logger = logging.getLogger(__name__)


class NotificationConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        from rest_framework_simplejwt.tokens import AccessToken
        from django.contrib.auth import get_user_model
        User = get_user_model()

        self.group_name = None

        # Extract token from query params
        try:
            query_string = self.scope["query_string"].decode()
            params = parse_qs(query_string)
            token = params.get("token", [None])[0]
        except Exception as e:
            logger.warning(f"[CONNECT] Failed to parse query string: {e}")
            await self.close()
            return

        if not token:
            logger.warning("[CONNECT] No token provided")
            await self.close()
            return

        # Validate token and get user
        try:
            access_token = AccessToken(token)
            user_id = access_token["user_id"]

            user = await database_sync_to_async(User.objects.get)(id=user_id)

        except Exception as e:
            logger.warning(f"[CONNECT] Token validation failed: {e}")
            await self.close()
            return

        # Assign group
        self.group_name = f"user_{user.id}"
        try:
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            logger.info(f"[CONNECT] User {user.id} added to group {self.group_name}")
        except Exception as e:
            logger.error(f"[CONNECT] group_add failed: {e}")
            await self.close()
            return

        await self.accept()

    async def disconnect(self, close_code):
        if isinstance(self.group_name, str):
            try:
                await self.channel_layer.group_discard(
                    self.group_name, self.channel_name
                )
                logger.info(f"[DISCONNECT] Removed from group {self.group_name}")
            except Exception as e:
                logger.error(f"[DISCONNECT] group_discard failed: {e}")
        else:
            logger.warning("[DISCONNECT] No valid group_name to discard")

    async def ws_notify(self, event):
        try:
            await self.send(
                text_data=json.dumps(
                    {
                        "event": event.get("event"),
                        "data": event.get("data"),
                    }
                )
            )
        except Exception as e:
            logger.error(f"[EVENT] Send failed: {e}")
