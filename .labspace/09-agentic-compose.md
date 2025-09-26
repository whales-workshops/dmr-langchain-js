# Dockerize the Hawaiian pizza expert with Agentic Compose

## Agentic Compose

- **Streamlined AI agent development**: Docker Agentic Compose enables developers to define, run, and scale AI agents using familiar Docker Compose workflows
- **OCI artifact model distribution**: AI models are pulled as OCI artifacts and automatically served by a model runner, exposing them as APIs for service containers
- **Declarative model configuration**: Uses the `models` top-level element in Compose files to declare AI models with attributes like context size and runtime flags
- **Automatic service integration**: Models are automatically connected to services when granted access via the `models` attribute, with connection details injected as environment variables
- **Simplified infrastructure management**: Provides containerization and orchestration capabilities specifically designed for AI agent architectures

## Demo

```bash 
cd ~/project/09-agentic-compose
```

## Run it with Docker Agentic Compose

Start:
```bash 
docker compose up --build --no-log-prefix
```

Connect to the bot:
```bash 
docker exec -it $(docker compose ps -q pizza-expert) /bin/bash
# or
docker exec -it 09-agentic-compose-pizza-expert-1 /bin/bash
```

Then type:
```bash 
node index.js
```

## Try other models
> make the changes in `compose.yml`

- `ai/qwen2.5:1.5B-F16`
- `ai/qwen2.5:3B-F16`
- `hf.co/menlo/lucy-gguf:q8_0`
- `hf.co/menlo/jan-nano-gguf:q4_k_m`