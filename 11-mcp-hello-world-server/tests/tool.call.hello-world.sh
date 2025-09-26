#!/bin/bash
: <<'COMMENT'
# Use tool "get_hawaiian_pizza_countries"
COMMENT

# STEP 1: Load the session ID from the environment file
source mcp.env
source mcp.server.env

MCP_SERVER=${MCP_SERVER:-"http://${DNS_NAME}:${MCP_HTTP_PORT}"}

read -r -d '' DATA <<- EOM
{
  "jsonrpc": "2.0",
  "id": "test",
  "method": "tools/call",
  "params": {
    "name": "hello_world",
    "arguments": {}
  }
}
EOM

curl ${MCP_SERVER}/mcp \
  -H "Content-Type: application/json" \
  -H "Mcp-Session-Id: $SESSION_ID" \
  -d "${DATA}" | jq