# Use a Node.js base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy all files
COPY . .

# Install angular dependence
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install --legacy-peer-deps

# Expose the port Angular serves on (default is 4200)
EXPOSE 4200

# Command to run when the container starts
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]