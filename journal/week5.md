there are a lot of things I didn't mention yet because I'm lazy

I will talk about dynamodb that I just wrote

everything should work, follow this step

first, you need to run the rds section that u will have data for users

then run the bash script in ddb folder
-drop (optional)
-schema-load
-list-table(optional, just for sure)
-seed
-scan(optional, just for sure)

Now you can observe data 
- get-conversation for all message in one group, notice that I have firmed it so if u need, modify the 'message_group_uuid'
- list-conversation for get all message from one users, I firmed the handle, so if u need, modify the 'handle' at line 32

I see there are a lot of issue, u should solve it by yourself, rememeber to observe the env var

Notice that I firmed user_uuid and group_uuid just for andrew, but the value of rds and dynamodb is not the same so u need to re-seed data again, u can handle it for auto seed if u want

I also complete send message from andrew to bayko