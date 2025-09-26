import { ChatOpenAI } from "@langchain/openai";
import prompts from "prompts";

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

let systemInstructions = ``
let knowledgeBase = ``

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

      default:
        let messages = [
            ["user", userQuestion]
        ]

        const response = await llm.invoke(messages)
        console.log(`Answer: ${response.content}`)
        console.log("\n");
        break;
  }

}
