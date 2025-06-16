FROM node:24-alpine

WORKDIR /app

# copy package json and install deps
COPY package*.json ./
RUN npm install

# copy rest of project
COPY . .

EXPOSE 5173

# pffffffff it seems like the project is unbuildable...
ENTRYPOINT [ "npm", "run", "dev"]