FROM nginx:latest
MAINTAINER Sascha Scherrer (see: www.saschascherrer.de)
# To build this container, we use the command
# $> docker build -t saschascherrer/blogroulette-frontend:latest .
# To run this container on your local host, please use
# $> docker run [--name my_name] -d -p 8080:80 saschascherrer/blogroulette-frontend 

# Add directory with static files
COPY www /usr/share/nginx/html

# Comment out to set custom nginx.conf
#COPY nginx.conf /etc/nginx/nginx.conf

