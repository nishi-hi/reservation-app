FROM node:latest

EXPOSE 4200

RUN npm update -g npm && \
  npm install -g n && \
  n lts && \
  npm update -g npm && \
  npm install -g @angular/cli
