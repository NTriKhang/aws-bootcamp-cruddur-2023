import uuid
from datetime import datetime, timedelta, timezone
from lib.db import db
from lib.ddb import Ddb

class CreateMessage:
  def run(mode=None, message=None, user_sender_handle=None, user_receiver_handle=None):
    model = {
      'errors': None,
      'data': None
    }
    mode='update'
    if user_sender_handle == None or len(user_sender_handle) < 1:
      model['errors'] = ['user_sender_handle_blank']

    if user_receiver_handle == None or len(user_receiver_handle) < 1:
      model['errors'] = ['user_reciever_handle_blank']

    if message == None or len(message) < 1:
      model['errors'] = ['message_blank'] 
    elif len(message) > 1024:
      model['errors'] = ['message_exceed_max_chars'] 

    if model['errors']:
      # return what we provided
      model['data'] = {
        'display_name': 'Andrew Brown',
        'handle':  user_sender_handle,
        'message': message
      }
    else:
      sql = db.template('users','create_message_users')

      # if user_receiver_handle == None:
      #   rev_handle = ''
      # else:
      #   rev_handle = user_receiver_handle
      
      user_sender_handle = 'andrewbrown'
      rev_handle = 'bayko'
      users = db.query_array_json(sql,{
        'handle': 'andrewbrown',
        'user_receiver_handle': rev_handle
      })
      print("USERS =-=-=-=-==")
      print(users)

      my_user    = next((item for item in users if item["kind"] == 'sender'), None)
      other_user = next((item for item in users if item["kind"] == 'recv')  , None)
      
      ddb = Ddb.client()
      message_group_uuid = '5ae290ed-55d1-47a0-bc6d-fe2bc2700399'
      now = datetime.now(timezone.utc).astimezone()
      if (mode == "update"):
        data = Ddb.create_message(
          client=ddb,
          message_group_uuid=message_group_uuid,
          message=message,
          my_user_uuid=my_user['uuid'],
          my_user_display_name=my_user['display_name'],
          my_user_handle=my_user['handle']
        )
      elif (mode == "create"):
        data = Ddb.create_message_group(
          client=ddb,
          message=message,
          my_user_uuid=my_user['uuid'],
          my_user_display_name=my_user['display_name'],
          my_user_handle=my_user['handle'],
          other_user_uuid=other_user['uuid'],
          other_user_display_name=other_user['display_name'],
          other_user_handle=other_user['handle']
        )
      model['data'] = data
    return model