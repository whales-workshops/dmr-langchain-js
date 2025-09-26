# Docker Model Runner

## 🚀 DMR in Docker Desktop

> Make a demo with Docker Desktop to show the features of Docker Model Runner

## 🚀 DMR in a terminal

```bash
cd ~/project/02-docker-model-runner
```

Try the following commands in a terminal:

```bash
docker model pull ai/qwen2.5:1.5B-F16
```

```bash
docker model run ai/qwen2.5:1.5B-F16
```

## 🚀 Query DMR with `curl`

### DMR REST API Summary

**DMR Base URLs:**
- From Containers: `http://model-runner.docker.internal/`
- FROM Host (TCP): `http://localhost:12434/`

**Model Management Endpoints:**
- `POST /models/create` - Create a new model
- `GET /models` - List all models
- `GET /models/{namespace}/{name}` - Get specific model details
- `DELETE /models/{namespace}/{name}` - Delete local model

**OpenAI-Compatible Endpoints:**
- `GET /engines/v1/models` - List available models
- `GET /engines/v1/models/{namespace}/{name}` - Retrieve specific model
- `POST /engines/v1/chat/completions` - Chat completions
- `POST /engines/v1/completions` - Text completions
- `POST /engines/v1/embeddings` - Create embeddings

**Example Usage:**
```bash
curl http://model-runner.docker.internal/engines/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "ai/qwen2.5:1.5B-F16",
        "messages": [{"role": "user", "content": "Hello!"}]
    }'
```





Read (and Run) the code of:

- `simple.completion.sh`
- `stream.completion.sh`