FROM ubuntu:16.04

MAINTAINER Israel viveros "israelviverosdev@gmail.com"

RUN apt-get update

RUN apt-get -qq update

RUN apt-get install sudo -y

RUN apt-get install curl -y

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

RUN sudo apt-get install -y nodejs

RUN sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6

RUN echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

RUN sudo apt-get update

RUN sudo apt-get install -y mongodb-org

RUN cd / && mkdir data && cd data && mkdir db

RUN mongod --fork --logpath /var/log/mongod.log
