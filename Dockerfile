FROM node:16-alpine3.14
#
RUN apk add --update gcc
RUN apk add --update g++
RUN apk add --update make
RUN apk add --update python3
RUN apk add --update py3-pip
RUN apk add git curl

#install nodejs npm


WORKDIR /app
