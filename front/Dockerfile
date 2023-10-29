FROM node:latest

EXPOSE 4200

WORKDIR /root

RUN npm update -g npm && \
  npm install -g n && \
  n lts && \
  npm update -g npm && \
  mkdir reservation-app-tmp && \
  cd reservation-app-tmp && \
  git init && \
  git config core.sparsecheckout true && \
  git remote add origin https://github.com/nishi-hi/reservation-app.git && \
  echo "front/reservation-app" > .git/info/sparse-checkout && \
  git pull origin main && \
  mv front/reservation-app /reservation-app-front && \
  cd .. && \
  rm -rf reservation-app-tmp && \
  cd /reservation-app-front && \
  npm install

ENV PATH /reservation-app-front/node_modules/.bin:${PATH}

WORKDIR /reservation-app-front
