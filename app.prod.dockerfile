FROM php:8.1-fpm

RUN apt-get update && apt-get install -y  \
    procps \
    npm \
    libpq-dev \
    git \
    cron \
    libicu-dev \
    --no-install-recommends
    
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pdo pdo_pgsql pgsql intl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN npm cache clean -f
RUN npm install -g n
RUN n stable

COPY --chown=www-data src /var/www/

WORKDIR /var/www/
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install --optimize-autoloader --no-dev
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

COPY cron/generate-demo-data /etc/cron.d/generate-demo-data-cron
RUN chmod 0644 /etc/cron.d/generate-demo-data-cron
RUN touch /var/log/cron.log
RUN crontab /etc/cron.d/generate-demo-data-cron
RUN /etc/init.d/cron start