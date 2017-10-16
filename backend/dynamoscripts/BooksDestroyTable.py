from __future__ import print_function # Python 2/3 compatibility
import boto3

dynamodb = boto3.client('dynamodb', region_name='us-west-2', endpoint_url="http://localhost:8000")
#dynamodb = boto3.client('dynamodb', region_name='us-west-2')


response = dynamodb.delete_table(
    TableName='Books'
)

print("Table status:", response)
