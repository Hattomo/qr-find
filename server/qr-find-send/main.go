// curl -v -X POST -H "Content-Type: application/json" -d '{"memo":"ertyuio","id":"efreorifjeroi"}' https://vx8qxx1cnk.execute-api.us-east-1.amazonaws.com/default/send

package main

import (
	"encoding/json"
	"errors"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/ses"
)

type Item struct {
	ID    string `dynamodbav:"id" json:"id"`
	Email string `dynamodbav:"email" json:"email"`
	Memo  string `dynamodbav:"memo" json:"memo"`
}

// Response Lambdaが返答するデータ
type Response struct {
	RequestMethod string `json:"RequestMethod"`
	Result        Item   `json:"Result"`
}

// Item構造体とResponse構造体は、Createのときと同じなので割愛

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	method := request.HTTPMethod
	headers := map[string]string{
		"Content-Type": "application/json",
        "Access-Control-Allow-Origin": request.Headers["origin"],
        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
        "Access-Control-Allow-Headers":"Access-Control-Allow-Headers,Origin,Authorization,Accept,X-Requested-With, Content-Type",
	}
	// pathparam := request.PathParameters["id"]
	// DB接続
	sess, err := session.NewSession()
	if err != nil {
		return events.APIGatewayProxyResponse{
			Headers:    headers,
			Body:       err.Error(),
			StatusCode: 500,
		}, err
	}

	db := dynamodb.New(sess)

	// リクエストボディのjsonから、Item構造体(DB用データの構造体)を作成
	reqBody := request.Body
	resBodyJSONBytes := ([]byte)(reqBody)
	post_item := Item{}
	if err := json.Unmarshal(resBodyJSONBytes, &post_item); err != nil {
		return events.APIGatewayProxyResponse{
			Headers:    headers,
			Body:       err.Error(),
			StatusCode: 500,
		}, err
	}

	// 検索条件を用意
	getParam := &dynamodb.GetItemInput{
		TableName: aws.String("find_qr"),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(post_item.ID),
			},
		},
	}

	// 検索
	result, err := db.GetItem(getParam)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Headers:    headers,
			Body:       err.Error(),
			StatusCode: 404,
		}, err
	}

	if len(result.Item) == 0 {
		return events.APIGatewayProxyResponse{
			Headers:    headers,
			Body:       "Not Found",
			StatusCode: 404,
		}, nil
	}

	// 結果を構造体にパース
	item := Item{}
	err = dynamodbattribute.UnmarshalMap(result.Item, &item)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Headers:    headers,
			Body:       err.Error(),
			StatusCode: 500,
		}, err
	}

	response_item := Item{
		ID: item.ID,
	}

	// Send Email
	from := os.Getenv("Mail_Addr")
	to := string(item.Email)
	title := "Your item is found!"
	body := "Your item QR Code is scaned!🐳\nYour memo is " + string(item.Memo) +"\nYour item id is " + string(item.ID) + "\nYour registered email is " + string(item.Email) + "\nMessage from the person who scaned your QR Code : " + string(post_item.Memo) + "\nWe hope you will find your item soon!🐳"
	mail_err := SendEmail(from, to, title, body)
	if mail_err != nil {
		log.Println("mail sending error")
	}

	// httpレスポンス作成
	res := Response{
		RequestMethod: method,
		Result:        response_item,
	}
	jsonBytes, _ := json.Marshal(res)

	return events.APIGatewayProxyResponse{
		Headers:    headers,
		Body:       string(jsonBytes),
		StatusCode: 200,
	}, nil
}

func SendEmail(from string, to string, title string, body string) error {
	svc := ses.New(session.New())
	input := &ses.SendEmailInput{
		Destination: &ses.Destination{
			ToAddresses: []*string{
				aws.String(to),
			},
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Text: &ses.Content{
					Charset: aws.String("UTF-8"),
					Data:    aws.String(body),
				},
			},
			Subject: &ses.Content{
				Charset: aws.String("UTF-8"),
				Data:    aws.String(title),
			},
		},
		Source: aws.String(from),
	}
	_, err := svc.SendEmail(input)
	if err != nil {
		return errors.New(err.Error())
	}
	return nil
}

func main() {
	lambda.Start(handler)
}
