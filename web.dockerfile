FROM nginx:1.21


COPY nginx/vhost.conf /etc/nginx/conf.d/default.conf

# Uncomment this line for deploying to a remote environment
COPY --chown=www-data src/public /var/www/public/