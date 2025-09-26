FROM debian:13-slim

# Docker container for running 02-docker-model-runner scripts
# Build: docker build -t dmr:demo .
# Run interactively: docker run -it dmr:demo
# Execute scripts: ./simple.completion.sh or ./stream.completion.sh

# Upgrade system and install curl and jq for running the scripts
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    curl \
    jq \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy scripts
COPY simple.completion.sh .
COPY stream.completion.sh .

# Make scripts executable
RUN chmod +x simple.completion.sh stream.completion.sh

# Default command to keep container running
CMD ["bash"]