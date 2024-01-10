from datetime import datetime, timedelta, timezone
from lib.ddb import Ddb

class MessageGroups:
  def run(user_handle):
    model = {
      'errors': None,
      'data': None
    }

    my_user_uuid = "546cc8ef-dc53-427a-ac5e-58325b1d3a52"

    print(f"UUID: {my_user_uuid}", flush=True)

    ddb = Ddb.client()
    print("init success", flush=True)
    data = Ddb.list_message_groups(ddb, my_user_uuid)
    print("list_message_groups:",data)

    model['data'] = data
    return model