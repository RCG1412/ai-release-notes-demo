import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the MCP server
const server = new McpServer({
  name: "TechWriterStyleGuide",
  version: "1.0.0",
});

// Define the writing rules (your style guide!)
const writingRules: Record<string, string> = {
  "New Feature": "Focus on the 'What' and the 'Why'. Highlight the new capability and how it solves a user problem. Use an enthusiastic but professional tone. Strictly avoid implementation details like database names or CSS classes.",
  "Enhancement": "Focus on the 'Before vs. After' or the specific metric improved (e.g., faster, larger limits). Frame it as an upgrade to an existing workflow. Do not mention internal infrastructure changes unless it directly impacts the user.",
  "Bug": "Acknowledge the issue briefly without blaming. Focus on the resolution and the improved user experience.",
  "Deprecation": "Be clear and urgent. Tell them what is going away, when, and what they must do to migrate.",
  "Tech Debt": "Translate technical improvements into user benefits (e.g., 'faster load times', 'better reliability'). Do not mention internal code refactoring.",
};

// Register the tool
server.tool(
  "get_writing_rule",
  "Get the specific writing rules for a type of release note content",
  {
    content_type: z.string().describe("The type of content (e.g., 'New Feature', 'Enhancement', 'Bug')"),
  },
  async ({ content_type }) => {
    const rule = writingRules[content_type] || "Use a professional, clear, and concise tone. Avoid jargon.";
    return {
      content: [
        {
          type: "text",
          text: rule,
        },
      ],
    };
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Style Guide MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});