FROM node:18-alpine
WORKDIR /app

# Copy the backend package.json
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose your backend API port (assuming 4000)
EXPOSE 4000

# Start the Node/Express server
CMD ["npm", "start"]
