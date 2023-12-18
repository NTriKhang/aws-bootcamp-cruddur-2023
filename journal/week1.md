# Week 1 — App Containerization

Containerize by docker have already set

Need to run 'pip3 install -r requirements.txt' and 'npm i' before run compose
* Btw, I include it to gitpod already

For check dynamoDb:

Create a table
aws dynamodb create-table \
    --endpoint-url http://localhost:8000 \
    --table-name Music \
    --attribute-definitions \
        AttributeName=Artist,AttributeType=S \
        AttributeName=SongTitle,AttributeType=S \
    --key-schema AttributeName=Artist,KeyType=HASH AttributeName=SongTitle,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --table-class STANDARD

Create an Item
aws dynamodb put-item \
    --endpoint-url http://localhost:8000 \
    --table-name Music \
    --item \
        '{"Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Call Me Today"}, "AlbumTitle": {"S": "Somewhat Famous"}}' \
    --return-consumed-capacity TOTAL  

List Tables
aws dynamodb list-tables --endpoint-url http://localhost:8000

Get Records
aws dynamodb scan --table-name cruddur_cruds --query "Items" --endpoint-url http://localhost:8000

For postgre connect:
run cmd: psql -Upostgre --host localhost
pass: password