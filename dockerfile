# Stage 1: Build the React Application
FROM node:18-alpine AS build
WORKDIR /app

# Copy the root package.json (Frontend dependencies)
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY src/ ./src/
COPY public/ ./public/
COPY tailwind.config.js ./
COPY *.json ./
COPY *.js ./

# Copy the .env file Jenkins creates before building
COPY .env ./

# Build the project (Outputs to the /build folder)
RUN npm run build

# Stage 2: Serve the build files using Nginx
FROM nginx:alpine
# Copy the compiled files from Stage 1 to Nginx's serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
