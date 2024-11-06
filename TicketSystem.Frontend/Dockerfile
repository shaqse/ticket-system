# Use Node.js image for building and running the Vite app
FROM node:alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the Vite development server's port
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev"]
