FROM php:8.1-fpm

RUN apt-get update && apt-get install -y  \
    libmagickwand-dev \
    procps \
    --no-install-recommends \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && docker-php-ext-install pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


# Uncomment this line for deploying to a remote environment
COPY --chown=www-data src /var/www/