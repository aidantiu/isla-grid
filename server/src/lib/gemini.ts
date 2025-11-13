// gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ContextValue } from "../types/userContextTypes.js";

const genAI = new GoogleGenerativeAI("AIzaSyAwsjrBPibunMAYeAUlkHXHVkGP1e_UbkY");

export type GeminiProposal = {
  recommendations: string[];
  bestFitEnergyType: string; // solar, hybrid, wind, hydro
  estimatedSavings: number; // in PHP
  rawText?: string;
  rawJson?: any;
};

export async function getGeminiProposalFromContext(
  context: ContextValue,
  userPrompt: string
): Promise<GeminiProposal | null> {
  const prompt = `
You are IslaBot, a Meralco community energy consultant AI.
Use the user's context below to give relevant, actionable advice.

Context:
- Location: ${context.location || "Unknown"}
- Monthly Income: ₱${context.monthlyIncome || 0}
- Monthly Expenses: ₱${context.monthlyExpenses || 0}
- Appliances: ${
    context.appliances
      ?.map((a) => `${a.name} (usage intensity: ${a.usageIntensity})`)
      .join(", ") || "None"
  }

Instruction:
Answer in JSON ONLY with these fields:
{
  "recommendations": [],
  "bestFitEnergyType": "",
  "estimatedSavings": 0
}

User Question: ${userPrompt}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent([
      { role: "user", parts: [{ text: prompt }] },
    ]);

    const textResponse = result.response.text();

    let parsed: any;
    try {
      parsed = JSON.parse(textResponse);
    } catch {
      // Attempt to extract JSON from extra text
      const s = textResponse.indexOf("{");
      const e = textResponse.lastIndexOf("}");
      if (s !== -1 && e !== -1 && e > s) {
        try {
          parsed = JSON.parse(textResponse.slice(s, e + 1));
        } catch {
          parsed = null;
        }
      } else {
        parsed = null;
      }
    }

    if (!parsed) {
      console.error("Gemini: failed to parse JSON:", textResponse);
      return null;
    }

    const proposal: GeminiProposal = {
      recommendations: Array.isArray(parsed.recommendations)
        ? parsed.recommendations.map(String)
        : [],
      bestFitEnergyType:
        typeof parsed.bestFitEnergyType === "string"
          ? parsed.bestFitEnergyType
          : "",
      estimatedSavings:
        typeof parsed.estimatedSavings === "number"
          ? parsed.estimatedSavings
          : 0,
      rawText: textResponse,
      rawJson: parsed,
    };

    return proposal;
  } catch (err) {
    console.error("getGeminiProposalFromContext error:", err);
    return null;
  }
}
