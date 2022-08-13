FROM wechaty/wechaty:latest
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone
COPY . /app
WORKDIR /app
COPY package.json ./
RUN  npm install && npm install pm2 -g
CMD ["npm", "run","drun"]


