import { ChatOpenAI } from "@langchain/openai";
import prompts from "prompts";
import fs from 'fs';

const llm = new ChatOpenAI({
  model: process.env.MODEL_RUNNER_LLM_CHAT || `ai/qwen2.5:0.5B-F16`,
  apiKey: "",
  configuration: {
    //baseURL: process.env.MODEL_RUNNER_BASE_URL || `http://localhost:12434/engines/llama.cpp/v1/`,
    baseURL: process.env.MODEL_RUNNER_BASE_URL || `http://model-runner.docker.internal/engines/llama.cpp/v1`,
  },
  temperature: 0.0,
  repeatPenalty: 2.2,
});

// Load the system instructions from a file
let systemInstructions = fs.readFileSync(process.env.SYSTEM_INSTRUCTIONS_PATH || "./settings/system-instructions.md", 'utf8')

// Load the knowledge base from a file
let knowledgeBase = fs.readFileSync(process.env.KNOWLEDGE_BASE_PATH || "./data/hawaiian-pizza-knowledge-base.md", 'utf8')

let messages = [
  ["system", systemInstructions],
  ["system", knowledgeBase],
]

let exit = false;
while (!exit) {
  const { userQuestion } = await prompts({
    type: "text",
    name: "userQuestion",
    message: "🤖 Your question: ",
    validate: (value) => (value ? true : "😡 Question cannot be empty"),
  });

  switch (userQuestion) {
    case "/bye":
      console.log("👋 See you later!");
      exit = true;
      break;
    case "/memory":
      console.log("🧠 Current conversation memory:");
      messages.forEach( ([role, content]) => {
        if (role !== "system") {
          console.log(`- ${role}: ${content}`);
        }
      });
      console.log("----");
      break;

    default:
      messages.push(["user", userQuestion]);

      let answer = "";
      const stream = await llm.stream(messages);
      for await (const chunk of stream) {
        process.stdout.write(chunk.content);
        answer += chunk.content;
      }
      console.log("\n");
      messages.push(["assistant", answer]);
      break;
  }

}
