# Stage 1: Build the application
FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf