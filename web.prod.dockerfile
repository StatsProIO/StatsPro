FROM nginx:1.21


COPY nginx/vhost.conf /etc/nginx/conf.d/default.conf

COPY --chown=www-data src/public /var/www/public/