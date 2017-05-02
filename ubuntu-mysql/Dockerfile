FROM ubuntu:16.04

MAINTAINER Israel viveros "israelviverosdev@gmail.com"

RUN apt-get update

RUN apt-get -qq update

RUN apt-get install sudo -y

RUN apt-get install curl -y

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

RUN sudo apt-get install -y nodejs

RUN DEBIAN_FRONTEND=noninteractive

RUN cd / && mkdir data && cd data

ADD mysql.sh /mysql.sh

RUN /bin/bash -c "source /mysql.sh"

RUN service mysql start
