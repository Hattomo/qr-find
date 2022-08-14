#!/bin/bash
set -e

echo -e "useage : ./lambda.sh <function_name>\n"
dir=$1
path=./server/$dir
cd $path
export DEBIAN_FRONTEND=noninteractive
echo -e "\nBuilding...🚀"
go mod tidy
GOOS=linux GOARCH=amd64 go build -o hello main.go
echo -e "\nZipping...🛸"
zip hello.zip hello
echo -e "\nDeploying...🛰️"
aws lambda update-function-code --function-name $dir --zip-file fileb://hello.zip
echo -e "Cleaning...🎉"
rm hello.zip && rm hello
