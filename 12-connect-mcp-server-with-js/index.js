// MCP helpers
import { fetchTools } from "./mcp.helpers.js";
// MCP
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";


async function main() {
  try {
    //----------------------------------------------------------------
    // Create the MCP Client
    //----------------------------------------------------------------
    // Set up the StreamableHTTP client transport
    const bearerToken = process.env.BEARER_TOKEN;

    let mcpServerBaseURL = process.env.MCP_SERVER_BASE_URL || "http://host.docker.internal:9696";

    // Set up the StreamableHTTP client transport (with auth headers)
    const transport = new StreamableHTTPClientTransport(new URL(`${mcpServerBaseURL}/mcp`), {
      
      authProvider: {
        tokens: async () => {
          return {
            access_token: bearerToken,
          };
        }
      },
    });

    // Create the MCP Client
    const mcpClient = new Client(
      {
        name: "mcp-http-client",
        version: "1.0.0",
        auth: {
          type: "bearer",
          token: bearerToken,
        },
      },
      {
        capabilities: {
          prompts: {},
          resources: {},
          tools: {},
          logging: {},
        },
      }
    );

    await mcpClient.connect(transport);
    console.log("✅ Connected to MCP Server!");

    //! Fetch tools
    let mcpTools = await fetchTools(mcpClient);

    // display the fetched tools
    if (mcpTools && mcpTools.tools) {
      console.log("✅ Fetched tools:");
      mcpTools.tools.forEach((tool) => {
        console.log("🔨 tool:", tool.name, ":");
        console.log(tool.inputSchema);

      });
    } else {
      console.log("❌ No tools fetched or invalid format.");
    }

    console.log("\n🔧 Testing MCP tools:");

    // Test the hello-world tool
    console.log("\n--- Testing hello-world tool ---");
    try {
      const helloWorldResult = await mcpClient.callTool({
        name: "hello_world",
        arguments: {}
      });
      console.log("✅ hello-world result:", helloWorldResult.content);
    } catch (error) {
      console.error("❌ Error calling hello-world:", error.message);
    }

    // Test the hello tool
    console.log("\n--- Testing hello tool ---");
    try {
      const helloResult = await mcpClient.callTool({
        name: "hello",
        arguments: {
          name: "Claude"
        }
      });
      console.log("✅ hello result:", helloResult.content);
    } catch (error) {
      console.error("❌ Error calling hello:", error.message);
    }

    // Test the greeting tool (if it exists)
    console.log("\n--- Testing greeting tool ---");
    try {
      const greetingResult = await mcpClient.callTool({
        name: "greeting",
        arguments: {
          firstname: "John",
          lastname: "Doe"
        }
      });
      console.log("✅ greeting result:", greetingResult.content);
    } catch (error) {
      console.error("❌ Error calling greeting:", error.message);
    }

    // Close the connection
    await mcpClient.close();
    console.log("\n🔴 Disconnected from MCP server");

  } catch (error) {
    console.error("❌ Error:", error);
  }
}

main().catch(console.error);




