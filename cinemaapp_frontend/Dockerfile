# Frontend Dockerfile
FROM node:18 as build

WORKDIR /app

# Install dependencies and build the application
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx stage
FROM nginx:1.21-alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static files and copy the build output
RUN rm -rf ./*
COPY --from=build /app/dist .

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the frontend port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
