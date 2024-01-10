SELECT 
  users.uuid,
  users.display_name,
  users.handle,
  CASE users.handle = %(handle)s
  WHEN TRUE THEN
    'sender'
  WHEN FALSE THEN
    'recv'
  ELSE
    'other'
  END as kind
FROM public.users
WHERE
  users.handle = %(handle)s
  OR 
  users.handle = %(user_receiver_handle)s