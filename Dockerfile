FROM node:16-alpine AS build

WORKDIR /project_car_shop

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

ENTRYPOINT ["npm"]

CMD ["run", "dev"]