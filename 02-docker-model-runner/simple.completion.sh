#!/bin/bash
#BASE_URL=${MODEL_RUNNER_BASE_URL:-http://localhost:12434/engines/llama.cpp/v1}
#BASE_URL=${MODEL_RUNNER_BASE_URL:-http://host.docker.internal:12434/engines/llama.cpp/v1}
BASE_URL=${MODEL_RUNNER_BASE_URL:-http://model-runner.docker.internal/engines/llama.cpp/v1}

MODEL=${MODEL_QWEN2_5_LARGE:-"ai/qwen2.5:0.5B-F16"}

read -r -d '' SYSTEM_INSTRUCTION <<- EOM
You are an expert of Pizza. 
EOM

read -r -d '' USER_CONTENT <<- EOM
What is the best pizza in the world?
EOM

read -r -d '' DATA <<- EOM
{
  "model":"${MODEL}",
  "options": {
    "temperature": 0.0,
    "repeat_last_n": 2
  },
  "messages": [
    {"role":"system", "content": "${SYSTEM_INSTRUCTION}"},
    {"role":"user", "content": "${USER_CONTENT}"}
  ],
  "stream": false
}
EOM

# Remove newlines from DATA 
DATA=$(echo ${DATA} | tr -d '\n')

echo "Using DATA: ${DATA}"

JSON_RESULT=$(curl --silent ${BASE_URL}/chat/completions \
    -H "Content-Type: application/json" \
    -d "${DATA}"
)

echo -e "\n==========================================================================\n"

echo -e "\n📝 Raw JSON response:\n"
echo "${JSON_RESULT}" | jq '.'

echo -e "\n"

echo -e "\n==========================================================================\n"

echo -e "📝 Extracted content from the response:\n"
CONTENT=$(echo "${JSON_RESULT}" | jq -r '.choices[0].message.content')
echo "${CONTENT}"

echo -e "\n==========================================================================\n"






