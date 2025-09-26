package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
)

func main() {

	// Create MCP server
	s := server.NewMCPServer(
		"mcp-hello-world-server",
		"0.0.0",
	)

	// Hello World tool
	helloWorldTool := mcp.NewTool("hello_world",
		mcp.WithDescription("Returns a simple hello world message"),
	)
	s.AddTool(helloWorldTool, helloWorldHandler)

	// Hello tool
	helloTool := mcp.NewTool("hello",
		mcp.WithDescription("Returns a hello message with a name"),
		mcp.WithString("name",
			mcp.Required(),
			mcp.Description("Name of the person to greet"),
		),
	)
	s.AddTool(helloTool, helloHandler)

	// Greeting tool
	greetingTool := mcp.NewTool("greeting",
		mcp.WithDescription("Returns a personalized greeting with first and last name"),
		mcp.WithString("firstname",
			mcp.Required(),
			mcp.Description("First name of the person to greet"),
		),
		mcp.WithString("lastname",
			mcp.Required(),
			mcp.Description("Last name of the person to greet"),
		),
	)
	s.AddTool(greetingTool, greetingHandler)

	// Start the HTTP server
	httpPort := os.Getenv("MCP_HTTP_PORT")
	if httpPort == "" {
		httpPort = "9090"
	}

	log.Println("MCP Files Server is running on port", httpPort)

	// Create a custom mux to handle both MCP and health endpoints
	mux := http.NewServeMux()

	// Add healthcheck endpoint
	mux.HandleFunc("/health", healthCheckHandler)

	// Add MCP endpoint
	httpServer := server.NewStreamableHTTPServer(s,
		server.WithEndpointPath("/mcp"),
	)
	// Register MCP handler with the mux
	mux.Handle("/mcp", httpServer)

	// Start the HTTP server with custom mux
	log.Fatal(http.ListenAndServe(":"+httpPort, mux))
}

func helloWorldHandler(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	message := "👋 Hello World! 🌍"
	log.Printf("Hello World tool called")
	return mcp.NewToolResultText(message), nil
}

func helloHandler(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	args := request.GetArguments()

	nameArg, exists := args["name"]
	if !exists || nameArg == nil {
		return nil, fmt.Errorf("missing required parameter 'name'")
	}

	name, ok := nameArg.(string)
	if !ok {
		return nil, fmt.Errorf("parameter 'name' must be a string")
	}

	message := fmt.Sprintf("👋 Hello %s! 🤗", name)
	log.Printf("Hello tool called for %s", name)
	return mcp.NewToolResultText(message), nil
}

func greetingHandler(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	args := request.GetArguments()

	firstnameArg, exists := args["firstname"]
	if !exists || firstnameArg == nil {
		return nil, fmt.Errorf("missing required parameter 'firstname'")
	}

	firstname, ok := firstnameArg.(string)
	if !ok {
		return nil, fmt.Errorf("parameter 'firstname' must be a string")
	}

	lastnameArg, exists := args["lastname"]
	if !exists || lastnameArg == nil {
		return nil, fmt.Errorf("missing required parameter 'lastname'")
	}

	lastname, ok := lastnameArg.(string)
	if !ok {
		return nil, fmt.Errorf("parameter 'lastname' must be a string")
	}

	message := fmt.Sprintf("🌟 Hello %s %s! Hope you're having a wonderful day! 😊", firstname, lastname)
	log.Printf("Greeting tool called for %s %s", firstname, lastname)
	return mcp.NewToolResultText(message), nil
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	response := map[string]interface{}{
		"status": "healthy",
		"server": "mcp-pizzerias-server",
	}
	json.NewEncoder(w).Encode(response)
}
