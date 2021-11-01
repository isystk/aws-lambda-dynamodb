console.log('Loading function');

var doc = require('dynamodb-doc');
var docClient = new doc.DynamoDB();

exports.handler = function(event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2));
  var params = {};
  params.TableName = "users";
  params.KeyConditions = [docClient.Condition("email", "EQ", event.track)];
  params.Limit = 20;
  params.ScanIndexForward = false;
  console.log(params);
  docClient.query(params, context.done);
};
