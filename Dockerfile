# Use the official Node.js image as the base image
FROM node:18 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the application
RUN npm run build

# Use Nginx for serving the React application in production
FROM nginx:1.23.1-alpine as production-stage

# Copy the built React app from the previous stage to Nginx's default HTML directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
