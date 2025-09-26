# Streaming Completion & **`System Instructions`**
> **🤚 We begin to educate the baby model 🐣**

## Setup

```bash
cd ~/project/04-streaming-completion
```

```bash
docker model pull ai/qwen2.5:0.5B-F16
```

## Streaming Completion

Replace:
```javacript
const response = await llm.invoke(messages)
console.log(`Answer: ${response.content}`)
```

By:
```javacript
const stream = await llm.stream(messages);
for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}
```

## Add more context

✋ Change the value of `systemInstructions` in `index.js` to provide more context to the model.

```javacript
let systemInstructions = `
You are a Hawaiian pizza expert. Your name is Bob.
Provide accurate, enthusiastic information about Hawaiian pizza's history 
(invented in Canada in 1962 by Sam Panopoulos), 
ingredients (ham, pineapple, cheese on tomato sauce), preparation methods, and cultural impact.
Use a friendly tone with occasional pizza puns. 
Defend pineapple on pizza good-naturedly while respecting differing opinions. 
If asked about other pizzas, briefly answer but return focus to Hawaiian pizza. 
Emphasize the sweet-savory flavor combination that makes Hawaiian pizza special.
USE ONLY THE INFORMATION PROVIDED IN THE KNOWLEDGE BASE.
`
```

```javacript
let knowledgeBase = `KNOWLEDGE BASE: 
## Traditional Ingredients
- Base: Traditional pizza dough
- Sauce: Tomato-based pizza sauce
- Cheese: Mozzarella cheese
- Key toppings: Ham (or Canadian bacon) and pineapple
- Optional additional toppings: Bacon, mushrooms, bell peppers, jalapeños

## Regional Variations
- Australia: "Hawaiian and bacon" adds extra bacon to the traditional recipe
- Brazil: "Portuguesa com abacaxi" combines the traditional Portuguese pizza (with ham, onions, hard-boiled eggs, olives) with pineapple
- Japan: Sometimes includes teriyaki chicken instead of ham
- Germany: "Hawaii-Toast" is a related open-faced sandwich with ham, pineapple, and cheese
- Sweden: "Flying Jacob" pizza includes banana, pineapple, curry powder, and chicken
`
```

### Add the instructions to the list of the messages

Replace:
```javascript
let messages = [
    ["user", userQuestion]
]
```

By:
```javascript
let messages = [
    ["system", systemInstructions],
    ["system", knowledgeBase],
    ["user", userQuestion]
]
```

## Demo

```bash
cd ~/project/04-streaming-completion
```

```bash
node index.js
```

## Play

### Questions 
- Try these questions: 
  - "who are you?"
  - "what is the best pizza in the world?"
  - "give me the main ingredients of this pizza"
  - "why people love this pizza?"

### Temperature

Try to change the value of the **temperature** parameter.

### Check if the LLM can remember you
- "Hey I'm Philippe"
- "Say my name"
- ...

### Exit

Type `/bye` to exit

