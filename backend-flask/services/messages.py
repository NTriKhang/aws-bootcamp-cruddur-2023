from datetime import datetime, timedelta, timezone
from lib.ddb import Ddb
class Messages:
  def run(message_group_uuid):
    model = {
      'errors': None,
      'data': None
    }

    # sql = db.template('users','uuid_from_cognito_user_id')
    my_user_uuid = "546cc8ef-dc53-427a-ac5e-58325b1d3a52"

    print(f"UUID: {my_user_uuid}")

    ddb = Ddb.client()
    data = Ddb.list_messages(ddb, message_group_uuid)
    print("list_messages")
    print(data)

    model['data'] = data
    return model