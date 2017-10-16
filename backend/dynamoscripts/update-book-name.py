from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

#dynamodb = boto3.resource('dynamodb', region_name='us-west-2', endpoint_url="http://localhost:8000")
dynamodb = boto3.resource("dynamodb", region_name='us-west-2')

table = dynamodb.Table('Books')

testname = "testvaluerob"
#name=""
id = 1

response = table.update_item(
    Key={
        'id': int(id)
    },
    UpdateExpression="SET #bookname = :n",
    ExpressionAttributeValues={
        ':n': testname
    },
    ExpressionAttributeNames = {
        '#bookname': 'name',
    },
    ReturnValues="UPDATED_NEW"
)

print("UpdateItem succeeded:")
print(json.dumps(response, indent=4, cls=DecimalEncoder))

