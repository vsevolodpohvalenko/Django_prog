# import asyncio
# import json
# from channels.consumer import AsyncConsumer
#
# class BoardConsumer(AsyncConsumer):
#   async def websocket_connect(self, event):
#     print('connected', event)
#     board_room = "boardroom"
#     self.board_room = board_room
#     await self.channel_layer.group_add(
#       board_room,
#       self.channel_name
#     )
#     await self.send({
#       "type": "websocket.accept"
#     })
#   async def websocket_receive(self, event):
#     drawing_data = event.get('text', None)
#     await self.channel_layer.group_send(
#       self.board_room,
#       {
#         "type": "board_message",
#         "text": drawing_data
#       })
#   async def board_message(self, event):
#     await self.send({
#       "type": 'websocket.send',
#       'text': event['text']
#     })
#   async def websocket_disconnect(self, event):
#     print('disconnected', event)
import datetime
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        """
        Connect to a chat room
        Spaces are replaced like this: 'My new room' -> 'My_new_room'
        """

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_name = self.room_name.replace(' ', '_')
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        """
        Receive a message and broadcast it to a room group
        UTC time is included so the client can display it in each user's local time
        """

        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        utc_time = datetime.datetime.now(datetime.timezone.utc)
        utc_time = utc_time.isoformat()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'utc_time': utc_time,
            }
        )

    def chat_message(self, event):
        """
        Receive a broadcast message and send it over a websocket
        """
        message = event['message']
        utc_time = event['utc_time']
        self.send(text_data=json.dumps({
            'message': message,
            'utc_time': utc_time,
        }))