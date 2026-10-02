import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create the MCP server
const server = new McpServer({
  name: "QualityMetrics",
  version: "1.0.0",
});

// Define readability thresholds
const readabilityThresholds = {
  fleschReadingEase: { min: 60, max: 70, description: "Plain English (60-70 is ideal for general audience)" },
  fleschKincaidGrade: { min: 8, max: 10, description: "8th-10th grade level (accessible to most users)" },
  gunningFog: { min: 8, max: 12, description: "8-12 years of education needed" },
  avgSentenceLength: { min: 15, max: 20, description: "15-20 words per sentence" },
  avgWordsPerParagraph: { min: 40, max: 60, description: "40-60 words per paragraph" },
  longSentences: { max: 5, description: "Fewer than 5 sentences over 25 words" },
  complexWords: { maxPercent: 10, description: "Less than 10% of words should have 3+ syllables" }
};

// Define quality scoring rubrics
const scoringRubrics = {
  accuracy: {
    excellent: "100% of content accurately reflects source tickets with no discrepancies",
    good: "90-99% accurate with minor wording differences that don't change meaning",
    fair: "70-89% accurate with some omissions or slight misrepresentations",
    poor: "Below 70% accurate with significant errors or invented content"
  },
  completeness: {
    excellent: "100% of tickets included in release notes",
    good: "95-99% of tickets included",
    fair: "80-94% of tickets included",
    poor: "Below 80% of tickets included"
  },
  relevance: {
    excellent: "All content clearly explains user benefits, zero jargon",
    good: "90%+ content is user-focused with minimal jargon",
    fair: "70-89% user-focused with some technical terms",
    poor: "Below 70% user-focused or heavy jargon use"
  },
  clarity: {
    excellent: "All sentences clear, concise, and unambiguous",
    good: "90%+ sentences are clear with minor improvements possible",
    fair: "70-89% clear with some confusing phrases",
    poor: "Below 70% clear with frequent ambiguity"
  },
  consistency: {
    excellent: "Perfect consistency in formatting, tone, and structure",
    good: "95%+ consistent with very minor variations",
    fair: "80-94% consistent with noticeable variations",
    poor: "Below 80% consistent"
  }
};

// Register tools
server.tool(
  "get_readability_thresholds",
  "Get the recommended readability metrics and thresholds",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(readabilityThresholds, null, 2),
        },
      ],
    };
  }
);

server.tool(
  "get_scoring_rubric",
  "Get the scoring rubric for a specific quality category",
  {
    category: z.enum(["accuracy", "completeness", "relevance", "clarity", "consistency"]).describe("The quality category to get rubric for"),
  },
  async ({ category }) => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(scoringRubrics[category], null, 2),
        },
      ],
    };
  }
);

server.tool(
  "get_all_scoring_rubrics",
  "Get all scoring rubrics for all quality categories",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(scoringRubrics, null, 2),
        },
      ],
    };
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Quality Metrics MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});