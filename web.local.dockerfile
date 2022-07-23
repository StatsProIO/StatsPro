FROM nginx:1.21


COPY nginx/vhost.conf /etc/nginx/conf.d/default.conf
