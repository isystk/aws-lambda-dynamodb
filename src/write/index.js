console.log('Loading function');

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

exports.handler = function(event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2));
  var tableName = "users";
  var item = {
    email: event.email,
    first_name: event.first_name,
    last_name: event.last_name,
    age: event.age
  };
  var params = {
    TableName: tableName,
    Item: item
  };
  dynamo.putItem(params, context.done);
};
