FROM nginx:latest

COPY www /usr/share/nginx/html

# Comment out to set custom nginx.conf
#COPY nginx.conf /etc/nginx/nginx.conf

