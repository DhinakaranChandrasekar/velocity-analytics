import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface InsightGenerationParams {
  datasetType: string;
  rowCount: number;
  columnCount: number;
  metrics: string[];
  categories: string[];
  findings: string[];
}

export async function generateAIInsights(
  params: InsightGenerationParams
): Promise<string[]> {
  if (!process.env.OPENAI_API_KEY) {
    // Fallback to deterministic insights if no API key
    return generateFallbackInsights(params);
  }

  try {
    const prompt = buildInsightPrompt(params);

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || "500"),
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract text from response
    const responseText = response.choices[0]?.message?.content || "";

    // Parse insights from response (split by newlines or bullets)
    const insights = responseText
      .split("\n")
      .filter((line: string) => line.trim().length > 0)
      .map((line: string) => line.replace(/^[-•*]\s+/, "").trim())
      .slice(0, 5);

    return insights.length > 0 ? insights : generateFallbackInsights(params);
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return generateFallbackInsights(params);
  }
}

function buildInsightPrompt(params: InsightGenerationParams): string {
  return `You are a data analyst. Analyze this dataset and provide 3-5 key insights.

Dataset Summary:
- Type: ${params.datasetType}
- Rows: ${params.rowCount}
- Columns: ${params.columnCount}
- Key Metrics: ${params.metrics.join(", ") || "None detected"}
- Categories: ${params.categories.join(", ") || "None detected"}

Initial Observations:
${params.findings.map((f) => `- ${f}`).join("\n")}

Generate actionable, data-driven insights in a concise format. Each insight should be 1-2 sentences.
Start each insight on a new line with a bullet point (•).`;
}

function generateFallbackInsights(
  params: InsightGenerationParams
): string[] {
  const insights = [
    `Dataset analysis complete. Identified ${params.columnCount} columns and ${params.rowCount} records.`,
  ];

  if (params.metrics.length > 0) {
    insights.push(
      `Found ${params.metrics.length} metric(s): ${params.metrics.join(", ")}`
    );
  }

  if (params.categories.length > 0) {
    insights.push(
      `Discovered ${params.categories.length} categorical dimension(s) for segmentation analysis.`
    );
  }

  insights.push(`This appears to be a ${params.datasetType} dataset.`);
  insights.push("Explore the generated charts to identify patterns and trends.");

  return insights.slice(0, 5);
}
