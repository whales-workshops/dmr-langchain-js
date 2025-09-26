FROM node:20-slim

# Docker container for running Node.js application with LangChain
# Build: docker build -t mcp-client:demo .
# Run interactively: docker run -it mcp-client:demo
# Execute applications: node index.js

# Set working directory
WORKDIR /app

# Copy package.json first for better Docker layer caching
COPY package.json .

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Default command to keep container running in interactive mode
CMD ["bash"]