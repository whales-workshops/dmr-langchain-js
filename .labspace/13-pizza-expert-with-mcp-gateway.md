# Docker MCP Gateway with the Hawaiian pizza expert

This demo showcases the **Docker MCP Gateway** integrated with a Hawaiian pizza expert chatbot. The system demonstrates how Model Context Protocol (MCP) can be used to create specialized AI agents that can access external services and data sources. The pizza expert can help users find pizzerias, get location information, and create custom pizza recipes by leveraging MCP tools for geolocation and restaurant data.

## 🐳📡 Docker MCP Gateway
> Unified, Secure Infrastructure for Agentic AI

### What is Docker MCP Gateway?

- **CLI plugin** for Docker **Desktop** and **CE** that manages Model Context Protocol (MCP) servers
- **Open-source enterprise solution** for orchestrating MCP servers
  - https://github.com/docker/mcp-gateway
- Provides a **standardized interface** for AI applications to interact with external MCP tools and services
- Implements a **gateway pattern**: AI Client → MCP Gateway → MCP Servers

### Key Features & Architecture

- **Container-based Servers**: Isolated Docker containers with minimal host privileges
- **Centralized Management**: Unified server and tool management across environments
- **Secure Secrets Handling**: Built-in OAuth and authentication management via Docker Desktop
- **Dynamic Discovery**: Automatic tool and resource discovery across AI clients
- **Monitoring & Tracing**: Built-in logging and call tracing capabilities

### Security & Isolation Benefits

- **Container Isolation**: Each MCP server runs in its own Docker container
- **Restricted Privileges**: Minimal host access for maximum security
- **Secure Configuration**: Consistent setup across different AI clients
- **Access Control**: Managed authentication and access policies
- **Enterprise-Ready**: Designed for both development and production environments

### Why Use Docker MCP Gateway?

- **Simplified Deployment**: Standardized way to manage MCP servers
- **Enhanced Security**: Isolated execution environment with controlled access
- **Cross-Client Compatibility**: Works with multiple AI clients seamlessly
- **Enterprise Scale**: Built for production environments
- **Developer Friendly**: Easy setup and management through familiar Docker tooling

## Demo

```bash 
cd 09-agentic-compose
```

## Run it with Docker Agentic Compose

Start:
```bash 
docker compose up --build --no-log-prefix
```

### Docker MCP Gateway CLI

```bash 
image: docker/mcp-gateway:latest
```



Connect to the bot:
```bash 
docker exec -it $(docker compose ps -q pizza-expert-with-mcp) /bin/bash
# or
docker exec -it 13-pizza-expert-with-mcp-gateway-pizza-expert-with-mcp-1 /bin/bash
```

### Try this

- I need a pizzeria in Japan
- Give me an address of pizzeria in Rovinj
- Make a crazy pizza with chocolate