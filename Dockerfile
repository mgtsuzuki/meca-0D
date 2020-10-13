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


    COPY Gemfile* /usr/src/app/
    WORKDIR /usr/src/app
    RUN bundle install
    COPY bin /usr/src/app/bin/
    COPY Rakefile* /usr/src/app/
    COPY app/assets/config/manifest.js /usr/src/app/app/assets/config/manifest.js
    COPY config/boot.rb /usr/src/app/config/boot.rb
    COPY config/application.rb /usr/src/app/config/application.rb
    RUN bin/rails webpacker:install
    RUN bin/rails webpacker:install:react
    
    COPY . /usr/src/app
    
    ENTRYPOINT [ "./docker-entrypoint.sh" ]
    CMD ["bin/rails", "s", "-b", "0.0.0.0"]
