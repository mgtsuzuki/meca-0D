FROM ruby:2.6-stretch

LABEL maintener='mtsuzuki@usp.br'

# Permite que o apt opere com fontes baseadas em https
RUN apt-get update -yqq && apt-get install -yqq --no-install-recommends apt-transport-https

# Assegure-se de instalar uma versao corrente para o Node
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

# Assegure-se de instalar uma versao corrente para o Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -yqq && apt-get install -yqq --no-install-recommends nodejs yarn

RUN curl -sL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg 13" | tee /etc/apt/sources.list.d/pgdg.list 
RUN apt-get update -yqq && apt-get install -yqq postgresql-client

WORKDIR /usr/src/app
COPY bin ./bin/
COPY Rakefile* .
COPY app/assets/config/manifest.js ./app/assets/config/manifest.js
COPY config/boot.rb ./config/boot.rb
COPY config/application.rb ./config/application.rb
COPY Gemfile* ./
RUN bundle install
RUN bin/rails webpacker:install
RUN bin/rails webpacker:install:react
COPY . .

COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["bin/rails", "s", "-b", "0.0.0.0"]
