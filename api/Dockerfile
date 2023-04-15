# Base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app to the working directory
COPY . .

# Expose port
EXPOSE 8080

# Start the server
CMD ["npm", "start"]
