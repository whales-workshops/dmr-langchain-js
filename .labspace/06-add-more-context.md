# Add more context for the LLM

## Setup

```bash 
cd 06-add-more-context
```

```bash 
docker model pull ai/qwen2.5:0.5B-F16
```

## Load Content from files

```javascript
let systemInstructions = fs.readFileSync(process.env.SYSTEM_INSTRUCTIONS_PATH || "./settings/system-instructions.md", 'utf8')

let knowledgeBase = fs.readFileSync(process.env.KNOWLEDGE_BASE_PATH || "./data/hawaiian-pizza-knowledge-base.md", 'utf8')
```
> 👋 you need to import ``fs`` at the top of the file:
> ```javascript
> import fs from 'fs';
> ```


## Demo

```bash 
cd 06-add-more-context
```

```bash 
node index.js
```

## Chat with Bob

- "What is your name?"
- "What is the best pizza in the world?"
- "What is the history of the hawaiian pizza?"
- "Who inented the hawaiian pizza?"
- "Give me a simple list of the regional variations of the hawaiian pizza"
- "What can I drink with an hawaian pizza?"

> 🤚🤚🤚 **The model has difficulty maintaining focus and concentrating only on the necessary data**
