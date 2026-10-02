import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the MCP server
const server = new McpServer({
  name: "ReleaseNotesStyleGuide",  // ← CHANGED from "TechWriterStyleGuide"
  version: "1.0.0",
});

// Define the writing rules (your style guide!)
const writingRules: Record<string, string> = {
  "Release Highlights": "Create a high-level summary section at the top of the release notes. Select the 5-8 most impactful changes across all categories (New Features, Enhancements, Bug Fixes). Write each bullet point from the user's perspective: what they can now do, how their experience improved, or what problem was solved. Use an enthusiastic, benefit-focused tone. Avoid technical jargon. Each bullet should be 1-2 sentences max. Focus on value, not implementation details. Group related changes when possible (e.g., 'Enhanced security with new 2FA options and account recovery').",
  
  "New Feature": "Focus on the 'What' and the 'Why'. Highlight the new capability and how it solves a user problem. Use an enthusiastic but professional tone. Strictly avoid implementation details like database names or CSS classes. IMPORTANT: When a ticket contains structured field information (like 'Fields and descriptions' with pipe-separated data or field lists), present it as a Markdown table with columns 'Field' and 'Description'. Do not list these as bullet points.",
  
  "Enhancement": "Focus on the 'Before vs. After' or the specific metric improved (e.g., faster, larger limits). Frame it as an upgrade to an existing workflow. Do not mention internal infrastructure changes unless it directly impacts the user. Use bullet points for enhancements.",
  
  "Bug": "Acknowledge the issue briefly without blaming. Focus on the resolution and the improved user experience. Do not include technical details about the root cause unless it helps users understand the fix. Use bullet points for bug fixes."
};

// Register the tool
server.tool(
  "get_writing_rule",
  "Get the specific writing rules for a type of release note content",
  {
    content_type: z.string().describe("The type of content (e.g., 'Release Highlights', 'New Feature', 'Enhancement', 'Bug')"),
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
  console.error("Release Notes Style Guide MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});