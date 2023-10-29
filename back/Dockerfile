FROM node:latest

EXPOSE 3001

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
  echo "back/reservation-app" > .git/info/sparse-checkout && \
  git pull origin main && \
  mv back/reservation-app /reservation-app-back && \
  cd .. && \
  rm -rf reservation-app-tmp && \
  cd /reservation-app-back && \
  npm install && \
  mkdir config

WORKDIR /reservation-app-back

COPY reservation-app/config/dev.js config/
