# Make a better Hawaiian pizza expert with RAG

Have a look to the source code of this project. It is based on the previous project `06-add-more-context` but now we use RAG (Retrieval Augmented Generation) to provide more appropriate context to the model (smaller content).

## Source code

The `index.js` file implements a RAG (Retrieval Augmented Generation) system that creates a pizza expert chatbot. Here's what the code does:

1. **Setup**: Initializes OpenAI chat and embedding models using local endpoints
2. **Document Processing**: Loads markdown files from the data directory and splits them into chunks using RecursiveCharacterTextSplitter
3. **Vector Store Creation**: Creates embeddings for each text chunk and stores them in a MemoryVectorStore for similarity search
4. **Interactive Loop**: Runs a continuous chat interface where users can ask questions
5. **RAG Pipeline**: For each user question, it performs similarity search to find relevant knowledge, then sends the question along with the retrieved context to the LLM
6. **Memory Management**: Maintains conversation history with configurable limits

### System Architecture

```mermaid
graph TB
    A[User Question] --> B[Similarity Search]
    B --> C[Vector Store]
    C --> D[Retrieve Relevant Chunks]
    D --> E[Combine with Context]
    E --> F[Send to LLM]
    F --> G[Generate Response]
    G --> H[Display to User]
    H --> I[Update Conversation Memory]
    
    subgraph "Knowledge Base"
        J[Markdown Files] --> K[Text Splitter]
        K --> L[Document Chunks]
        L --> M[Embeddings]
        M --> C
    end
```

### Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant S as System
    participant V as Vector Store
    participant L as LLM
    
    Note over S,V: Initialization Phase
    S->>S: Load markdown files
    S->>S: Split into chunks
    S->>V: Create embeddings & store
    
    Note over U,L: Chat Phase
    U->>S: Ask question
    S->>V: Similarity search
    V->>S: Return relevant chunks
    S->>S: Build context with system instructions + history + knowledge
    S->>L: Send messages
    L->>S: Stream response
    S->>U: Display response
    S->>S: Update conversation memory
```

## Demo

```bash 
cd 08-pizza-expert-with-rag
```

```bash 
node index.js
```

### Play with the pizza expert

Open the file `data/hawaiian-pizza-knowledge-base.md` and try to ask questions about the Hawaiian pizza.

### Play more

- Copy the file `/examples/crazy-pizza-recipes.md` to the `data` directory and restart the app. 
- Now you have more knowledge about the "Crazy" pizzas 🤪.
- Try to ask questions about these crazy pizzas.
