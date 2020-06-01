FROM node:12

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 3000

CMD npm run dev