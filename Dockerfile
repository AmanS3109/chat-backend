# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Compile TypeScript (optional, for production)
# RUN npm run build

# Expose port
EXPOSE 5000

# Start dev server
CMD ["npm", "run", "dev"]
