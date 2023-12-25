Follow this in case the db doesn't have anything

So, in the text file, i have exported two enviroment var, it should work normally

I haven't tried to connect to rds yet, still local postgres
maybe first you need to cd to backend-flask

to test connection I think u should run bin/dbconnect first

then run bin/db-drop, just for sure
- bin/db-create
- bin/db-schemaload
- bin/db-seed

if something weird happen, go to check if there any suitable env var exist 😊
