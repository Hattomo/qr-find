// Reference
// https://qiita.com/saki-engineering/items/e5cf56301d94ceea3ce0

package main

import (
    "encoding/json"
	"crypto/sha256"
	"time"
	"encoding/hex"
	"strconv"
	"math/rand"

    "github.com/aws/aws-lambda-go/events"
    "github.com/aws/aws-lambda-go/lambda"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/dynamodb"
    "github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

// Item DBに入れるデータ
type Item struct {
    ID    string `dynamodbav:"id" json:id`
    Email string `dynamodbav:"email" json:"email"`
    Memo  string `dynamodbav:"memo" json:"memo"`
}

// Response Lambdaが返答するデータ
type Response struct {
    RequestMethod string `json:"RequestMethod"`
    Result        Item   `json:"Result"`
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
    method := request.HTTPMethod

    headers := map[string]string{
        "Content-Type":                   "application/json",
        "Access-Control-Allow-Origin": request.Headers["origin"],
        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
        "Access-Control-Allow-Headers":"Access-Control-Allow-Headers,Origin,Authorization,Accept,X-Requested-With, Content-Type",
        "Access-Control-Allow-Credential":"true",
    }

    // DBと接続するセッションを作る→DB接続
    sess, err := session.NewSession()
    if err != nil {
        return events.APIGatewayProxyResponse{
            Headers: headers,
            Body:       err.Error(),
            StatusCode: 500,
        }, err
    }

    db := dynamodb.New(sess)

    // リクエストボディのjsonから、Item構造体(DB用データの構造体)を作成
    reqBody := request.Body
    resBodyJSONBytes := ([]byte)(reqBody)
    item := Item{}
    if err := json.Unmarshal(resBodyJSONBytes, &item); err != nil {
        return events.APIGatewayProxyResponse{
            Headers: headers,
            Body:       err.Error(),
            StatusCode: 500,
        }, err
    }

	item.ID = GetHash()

    // Item構造体から、inputするデータを用意
    inputAV, err := dynamodbattribute.MarshalMap(item)
    if err != nil {
        return events.APIGatewayProxyResponse{
            Headers: headers,
            Body:       err.Error(),
            StatusCode: 500,
        }, err
    }
    input := &dynamodb.PutItemInput{
        TableName: aws.String("find_qr"),
        Item:      inputAV,
    }

    // insert実行
    _, err = db.PutItem(input)
    if err != nil {
        return events.APIGatewayProxyResponse{
            Headers: headers,
            Body:       err.Error(),
            StatusCode: 500,
        }, err
    }

    // httpレスポンス作成
    res := Response{
        RequestMethod: method,
		Result:        item,
    }
    jsonBytes, _ := json.Marshal(res)


    return events.APIGatewayProxyResponse{
        Headers: headers,
        Body:       string(jsonBytes),
        StatusCode: 200,
    }, nil
}

func RandomString(n int) string {
    var letter = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

    b := make([]rune, n)
    for i := range b {
        b[i] = letter[rand.Intn(len(letter))]
    }
    return string(b)
}

func GetHash() string {
	var hash_str string = strconv.FormatInt(time.Now().Unix(),10) + RandomString(20)
	hash := sha256.Sum256([]byte(hash_str))
	return hex.EncodeToString(hash[:])
}

func main() {
    lambda.Start(handler)
}
