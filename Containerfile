FROM node:24-alpine AS builder

WORKDIR /app

# copy package json and install deps
COPY package*.json ./
RUN npm install

# copy rest of project
COPY . .

EXPOSE 5173

# build will be at /app/dist
RUN npm run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf