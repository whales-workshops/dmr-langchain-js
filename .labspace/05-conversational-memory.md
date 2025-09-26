# Conversational Memory

## Setup

```bash terminal-id=terminal-05
cd 05-conversational-memory
```

```bash terminal-id=terminal-05
docker model pull ai/qwen2.5:0.5B-F16
```

## Move the messages list from the loop

1. Move the list of messages before the loop:
```javascript
let messages = [
    ["system", systemInstructions],
    ["system", knowledgeBase],          
    ["user", userQuestion]
]
```

2. Then remove the user question:
```javascript
let messages = [
  ["system", systemInstructions],
  ["system", knowledgeBase],
]
```

3. Add the user question to the messages list, just before the completion call:
```javascript
messages.push(["user", userQuestion]);
```

4. Change the completion part...:
```javascript
const stream = await llm.stream(messages);
for await (const chunk of stream) {
    process.stdout.write(chunk.content);
}
```

To accumulate the chunks value into the answer variable:
```javascript
let answer = "";
const stream = await llm.stream(messages);
for await (const chunk of stream) {
    process.stdout.write(chunk.content);
    answer += chunk.content;
}
```

5. And add the assistant answer after the completion call:
```javascript
messages.push(["assistant", answer]);
```

## Add a tool to display the memory

Update your code with this:
```javascript
case "/memory":
    console.log("🧠 Current conversation memory:");
    messages.forEach( ([role, content]) => {
    if (role !== "system") {
        console.log(`- ${role}: ${content}`);
    }
    });
    console.log("----");
    break;
```
> Then when you will type: `/memory`, you will see all the messages (except the `system` messages)


## Demo

```bash terminal-id=terminal-05
cd 05-conversational-memory
```

```bash terminal-id=terminal-05
node index.js
```

## Play

### Check if the LLM can remember you
- "Hey I'm Philippe"
- "Say my name"
- ...

Or:
- "The scret password is QWERTY"
- "What is the secret password?"

> 👋 Don't forget that sometimes 🐣 small models do whatever they want 😝

### Exit

Type `/bye` to exit