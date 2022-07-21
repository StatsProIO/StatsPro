FROM php:8.1-fpm

RUN apt-get update && apt-get install -y  \
    libmagickwand-dev \
    procps \
    nodejs \
    npm \
    libpq-dev \
    git \
    --no-install-recommends
    
RUN pecl install imagick \
    && docker-php-ext-enable imagick \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN npm cache clean -f
RUN npm install -g n
RUN n stable

# Uncomment this line for deploying to a remote environment
COPY --chown=www-data src /var/www/

RUN ls /var/www/