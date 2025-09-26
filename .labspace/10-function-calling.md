# Dockerize the Hawaiian pizza expert with Function Calling

## Function Calling?

Function calling is the capability of an LLM to detect/recognize a function call and transcribe it into JSON format, including all parameters. The model identifies when a user's request requires a specific function and translates that intent into structured JSON with the appropriate function name and parameter values. 

You must provide a tool catalog to the model so it can recognize available tools, and of course you need to implement the actual tools afterward.

## Function Calling supports with Small Models

Small models generally don't have very good tool support, but there are exceptions. Some smaller models have been specifically trained or fine-tuned for function calling capabilities and can perform reasonably well with tools.


## Demo

### Run it with Docker Agentic Compose
> 👋 Note: we use `hf.co/menlo/jan-nano-gguf:q4_k_m`

```bash terminal-id=terminal-10
cd 10-function-calling
```

Start:
```bash terminal-id=terminal-10
docker compose up --build --no-log-prefix
```

Connect to the bot:
```bash terminal-id=terminal-10-bis
cd 10-function-calling
```

```bash terminal-id=terminal-10-bis
docker exec -it $(docker compose ps -q pizza-tools) /bin/bash
```

> - or: `docker exec -it 10-function-calling-pizza-tools-1 /bin/bash`

Then type:
```bash terminal-id=terminal-10-bis
node index.js
```

## Try this questions

- "I need a pizzeria address in Paris"
- "I need a pizzeria address in Roma"