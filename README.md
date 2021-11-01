aws-lambda-dynamodb

## 🌐概要

AWS Lambda から、DynamoDB に書き込みをするサンプルです。


## 💬使い方

### Labmda をZIPに纏める
```
gulp dist
```

### aws cli を起動
```
docker-compose up -d
docker-compose exec awscli /bin/bash
```

### Labmda をAWS にデプロイ
```
POLICY=$(cat<< EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
)
# ロールを作成する
aws iam create-role \
  --role-name lambda-dynamodb-role \
  --assume-role-policy-document "${POLICY}"

# 実行結果を CloudWatch Log として保存させる
aws iam attach-role-policy \
  --role-name lambda-dynamodb-role \
  --policy-arn arn:aws:iam::aws:policy/CloudWatchLogsFullAccess

# Lambda関数を作成する
aws lambda create-function \
  --function-name lambda-dynamodb-read-function \
  --zip-file fileb://dist/read-fde29740-3b0a-11ec-856f-514ae6ed300d.zip \
  --handler index.handler \
  --runtime nodejs14.x \
  --role "arn:aws:iam::004796740041:role/lambda-dynamodb-role"
aws lambda create-function \
  --function-name lambda-dynamodb-write-function \
  --zip-file fileb://dist/write-fde29740-3b0a-11ec-856f-514ae6ed300d.zip \
  --handler index.handler \
  --runtime nodejs14.x \
  --role "arn:aws:iam::004796740041:role/lambda-dynamodb-role"

# Lambda関数を実行してみる
aws lambda invoke \
  --function-name lambda-dynamodb-write-function \
  --log-type Tail \
  --payload '{"email":"ise@gmail.com", "first_name":"太郎", "last_name":"伊勢", "age":40}' \
  outputfile.txt

  
aws lambda invoke \
  --function-name lambda-dynamodb-read-function \
  --log-type Tail \
  --payload '{"email":"ise@gmail.com"}' \
  outputfile.txt
```


## 🎫 Licence

[MIT](https://github.com/isystk/aws-lambda-dynamodb/blob/master/LICENSE)

## 👀 Author

[isystk](https://github.com/isystk)
