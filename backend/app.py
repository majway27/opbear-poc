from __future__ import print_function # Python 2/3 compatibility
from chalice import Chalice
import boto3
import json
import decimal
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

app = Chalice(app_name='books')
#dynamodb = boto3.resource("dynamodb", region_name='us-west-2', endpoint_url="http://localhost:8000")
dynamodb = boto3.resource("dynamodb", region_name='us-west-2')

@app.route('/books', methods=['GET'], api_key_required=True, cors=True)
def books_index():
    table = dynamodb.Table('Books')
    try:
        response = table.scan(
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return response["Items"]
    

@app.route('/books/{id}', methods=['GET'], api_key_required=True, cors=True)
def find_book(id):
    table = dynamodb.Table('Books')
    print("id sent: " + id)
    try:
        response = table.get_item(
            Key={
                'id': int(id)
            }
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return response['Item']
    
    
@app.route('/books/create/{id}/{name}', methods=['PUT'], api_key_required=True, cors=True)
def books_put(id, name):
    table = dynamodb.Table('Books')

    print("id sent: " + id)
    try:
        response = table.put_item(
            Item={
                'id': int(id),
                'name': name,
            }
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("PutItem Succeeded")


@app.route('/books/create', methods=['POST'], api_key_required=True, cors=True)
def books_post():
    table = dynamodb.Table('Books')

    print("id sent: " + str(app.current_request.json_body['id']) + "name sent: " + app.current_request.json_body['name'])
    
    try:
        
        id = app.current_request.json_body['id']
        name = app.current_request.json_body['name']
        
        response = table.put_item(
            Item={
                'id': int(id),
                'name': name,
            }
        )
        
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("PostItem Succeeded")
        

@app.route('/books/delete/{id}', methods=['DELETE'], api_key_required=True, cors=True)
def book_delete(id):
    table = dynamodb.Table('Books')

    print("Delete id sent: " + id)
    try:
        response = table.delete_item(
            Key={
                'id': int(id)
            }
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("DeleteItem Succeeded")
        

@app.route('/books/update/{id}', methods=['PUT'], api_key_required=True, cors=True)
def book_update(id):
    table = dynamodb.Table('Books')

    print("id sent: " + str(id) + " new name sent: " + app.current_request.json_body['name'])
    
    try:
        response = table.update_item(
            Key={
                'id': int(id)
            },
            UpdateExpression="SET #bookname = :n",
            ExpressionAttributeValues={
                ':n': app.current_request.json_body['name']
            },
            ExpressionAttributeNames = {
                '#bookname': 'name',
            },
            ReturnValues="UPDATED_NEW"
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print("UpdateItem Succeeded")
        return response['Attributes']