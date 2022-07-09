# syntax=docker/dockerfile:1
FROM golang:1.16-alpine

WORKDIR /todoql-server

# download the required Go dependencies
COPY go.mod ./
COPY go.sum ./
RUN go mod download
# COPY *.go ./
COPY . ./
COPY *.go ./

RUN go build -o /main

ENV PORT=8080
EXPOSE 8080

CMD [ "/main" ]
