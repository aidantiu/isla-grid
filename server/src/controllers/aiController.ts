import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FallbackChatbot, type PortfolioData } from "../lib/fallbackChatbot.js";

type ProviderSource = "gemini" | "fallback";

type Barangay = {
  name: string;
  province: string;
  population: number;
  households: number;
  avgDailyDemandKWh: number;
  solarIrradiance: number;
  hasRiverAccess: boolean;
  avgWindSpeed: number;
  gridConnected: boolean;
  currentElectricityCostPerKWh: number;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SERVER_ROOT = path.resolve(__dirname, "../../");

dotenv.config({ path: path.resolve(SERVER_ROOT, ".env") });

const PORTFOLIO_OWNER = process.env.PORTFOLIO_OWNER ?? "the portfolio owner";
const AI_PROVIDER = process.env.AI_PROVIDER ?? "fallback";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_KEY = process.env.API_KEY;
const RATE_LIMIT_PER_MINUTE = Number(process.env.RATE_LIMIT_PER_MINUTE ?? 30);

const portfolioDataPath = process.env.PORTFOLIO_DATA_PATH
  ? path.resolve(SERVER_ROOT, process.env.PORTFOLIO_DATA_PATH)
  : path.resolve(SERVER_ROOT, "data/portfolioData.json");

let portfolioData: PortfolioData = {
  profile: "Portfolio data not configured",
  projects: [],
  skills: {},
  experience: [],
  education: {},
  certifications: [],
  contact: {},
};

type RateLimitEntry = {
  count: number;
  resetTime: number;
};

type AnalyticsSnapshot = {
  totalQueries: number;
  popularKeywords: Record<string, number>;
  providerUsage: Record<ProviderSource, number>;
  startTime: string;
};

const analytics: AnalyticsSnapshot = {
  totalQueries: 0,
  popularKeywords: {},
  providerUsage: { gemini: 0, fallback: 0 },
  startTime: new Date().toISOString(),
};

const rateLimitMap = new Map<string, RateLimitEntry>();

let fallbackBot = new FallbackChatbot(portfolioData);
const geminiClient = GEMINI_API_KEY
  ? new GoogleGenerativeAI(GEMINI_API_KEY)
  : null;

const CONSTANTS = {
  solar: { systemEfficiency: 0.75, capexPerKW: 50000, opexPercentage: 0.02 },
  hydro: { capexPerKW: 120000, opexPercentage: 0.03 },
  wind: { capexPerKW: 85000, opexPercentage: 0.025, minViableSpeed: 4.0 },
  battery: { capexPerKWh: 15000, opexPercentage: 0.02 },
};

try {
  console.log("GEMINI_API_KEY:", GEMINI_API_KEY ? "Loaded" : "Not Set");
  if (fs.existsSync(portfolioDataPath)) {
    const raw = fs.readFileSync(portfolioDataPath, "utf8");
    portfolioData = JSON.parse(raw) as PortfolioData;
    console.log(`✅ Portfolio data loaded from ${portfolioDataPath}`);
    fallbackBot = new FallbackChatbot(portfolioData);
  } else {
    console.warn(`⚠️ Portfolio data file not found at ${portfolioDataPath}`);
  }
} catch (error) {
  console.error("❌ Failed to load portfolio data:", (error as Error).message);
}

function trackQuery(message: string, source: ProviderSource) {
  analytics.totalQueries += 1;
  analytics.providerUsage[source] = (analytics.providerUsage[source] ?? 0) + 1;

  message
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .forEach((word) => {
      analytics.popularKeywords[word] =
        (analytics.popularKeywords[word] ?? 0) + 1;
    });
}

function createPrompt(message: string): string {
  return `You are ${PORTFOLIO_OWNER}'s professional portfolio chatbot. Your ONLY purpose is to provide information about their professional background, skills, education, projects, and career.\n\nSTRICT GUIDELINES:\n1. ONLY answer questions about ${PORTFOLIO_OWNER}'s professional information from the provided data\n2. If asked about anything NOT in the portfolio data (like personal life, food preferences, unrelated topics), politely redirect\n3. Keep responses professional, concise, and helpful\n4. Always stay within the scope of the provided portfolio data\n\n${PORTFOLIO_OWNER}'s Portfolio Data:\n${JSON.stringify(
    portfolioData,
    null,
    2
  )}\n\nRESPONSE RULES:\n- If the question is about professional background: Answer using ONLY the provided data\n- If the question is outside professional scope: Respond with "I'm ${PORTFOLIO_OWNER}'s portfolio assistant and can only help with questions about their professional background, skills, projects, education, and career. Please ask me something about their work experience, technical skills, or projects!"\n\nUser Question: ${message}\nYour Response:`;
}

async function generateWithGemini(message: string, prompt: string) {
  if (!geminiClient) {
    throw new Error("Gemini client is not configured");
  }

  const model = geminiClient.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  trackQuery(message, "gemini");
  return text.trim();
}

function calculateEnergyMix(barangay: Barangay, demandMultiplier: number) {
  const annualDemandKWh = barangay.avgDailyDemandKWh * 365 * demandMultiplier;

  const solarAnnualGen = annualDemandKWh * 0.6;
  const solarCapKW =
    solarAnnualGen /
    (barangay.solarIrradiance * 365 * CONSTANTS.solar.systemEfficiency);
  const solarCapex = solarCapKW * CONSTANTS.solar.capexPerKW;

  let hydroCapKW = 0;
  let hydroAnnualGen = 0;
  let hydroCapex = 0;
  if (barangay.hasRiverAccess) {
    hydroAnnualGen = annualDemandKWh * 0.25;
    hydroCapKW = hydroAnnualGen / (8760 * 0.4);
    hydroCapex = hydroCapKW * CONSTANTS.hydro.capexPerKW;
  }

  let windCapKW = 0;
  let windAnnualGen = 0;
  let windCapex = 0;
  if (barangay.avgWindSpeed >= CONSTANTS.wind.minViableSpeed) {
    windAnnualGen = annualDemandKWh * 0.15;
    windCapKW = windAnnualGen / (8760 * 0.25);
    windCapex = windCapKW * CONSTANTS.wind.capexPerKW;
  }

  const batteryCapKWh =
    ((barangay.avgDailyDemandKWh * demandMultiplier) / 24) * 4;
  const batteryCapex = batteryCapKWh * CONSTANTS.battery.capexPerKWh;

  const totalGen = solarAnnualGen + hydroAnnualGen + windAnnualGen;
  const totalCapKW = solarCapKW + hydroCapKW + windCapKW;
  const totalCapex = solarCapex + hydroCapex + windCapex + batteryCapex;
  const totalOpex = totalCapex * 0.02;

  return {
    solar: {
      capacityKW: Math.round(solarCapKW * 10) / 10,
      capex: Math.round(solarCapex),
      percentage: 60,
    },
    hydro: {
      capacityKW: Math.round(hydroCapKW * 10) / 10,
      capex: Math.round(hydroCapex),
      percentage: barangay.hasRiverAccess ? 25 : 0,
    },
    wind: {
      capacityKW: Math.round(windCapKW * 10) / 10,
      capex: Math.round(windCapex),
      percentage: barangay.avgWindSpeed >= 4 ? 15 : 0,
    },
    battery: {
      capacityKWh: Math.round(batteryCapKWh * 10) / 10,
      capex: Math.round(batteryCapex),
    },
    total: {
      capacityKW: Math.round(totalCapKW * 10) / 10,
      totalCapex: Math.round(totalCapex),
      annualOpex: Math.round(totalOpex),
      coverage: Math.round((totalGen / annualDemandKWh) * 100),
    },
  };
}

function calculateFinancials(barangay: Barangay, energyMix: any) {
  const annualDemandKWh = barangay.avgDailyDemandKWh * 365;
  const currentCost = annualDemandKWh * barangay.currentElectricityCostPerKWh;
  const savings =
    (currentCost * energyMix.total.coverage) / 100 - energyMix.total.annualOpex;
  const payback = energyMix.total.totalCapex / savings;
  const roi20 =
    ((savings * 20 - energyMix.total.totalCapex) / energyMix.total.totalCapex) *
    100;

  return {
    totalInvestment: energyMix.total.totalCapex,
    annualSavings: Math.round(savings),
    paybackYears: Math.round(payback * 10) / 10,
    roi20Year: Math.round(roi20 * 10) / 10,
  };
}

async function generateREProposal(
  barangay: Barangay,
  energyMix: any,
  financials: any,
  demandMultiplier: number,
  notes?: string
) {
  if (!geminiClient) {
    throw new Error(
      "Gemini client is not configured. Please set GEMINI_API_KEY and restart the server."
    );
  }

  const prompt = `Create a professional renewable energy proposal for ${
    barangay.name
  }, ${barangay.province}.

COMMUNITY PROFILE:
- ${barangay.households} households, ${barangay.population} residents
- Daily energy demand: ${Math.round(
    barangay.avgDailyDemandKWh * demandMultiplier
  )} kWh
- Current electricity cost: ₱${barangay.currentElectricityCostPerKWh}/kWh

PROPOSED SYSTEM:
- Solar: ${energyMix.solar.capacityKW} kW (${energyMix.solar.percentage}%)
- Hydro: ${energyMix.hydro.capacityKW} kW (${energyMix.hydro.percentage}%)
- Wind: ${energyMix.wind.capacityKW} kW (${energyMix.wind.percentage}%)
- Battery: ${energyMix.battery.capacityKWh} kWh
- Total: ${energyMix.total.capacityKW} kW covering ${
    energyMix.total.coverage
  }% of demand

ECONOMICS:
- Investment: ₱${financials.totalInvestment.toLocaleString()}
- Annual savings: ₱${financials.annualSavings.toLocaleString()}
- Payback: ${financials.paybackYears} years
- 20-year ROI: ${financials.roi20Year}%

POLICY CONTEXT:
The Philippine RE Act (RA 9513) provides incentives including 7-year income tax holiday, duty-free imports, and net metering. Community projects qualify for DOE grants and development bank financing.

${notes ? `SPECIAL REQUIREMENTS: ${notes}` : ""}

Write a compelling 4-section proposal:
1. Executive Summary (why this is the right choice)
2. Technical Design (system components and performance)
3. Financial Analysis (investment and returns)
4. Implementation Plan (timeline and next steps)

Keep it professional yet accessible for barangay officials.`;

  try {
    const model = geminiClient.getGenerativeModel({
      model: "gemini-2.5-pro",
    });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text || !text.trim()) {
      throw new Error("Gemini returned an empty response");
    }

    return { text: text.trim(), source: "gemini" as const };
  } catch (error) {
    console.warn(
      "Gemini API failed for proposal generation:",
      (error as Error).message
    );
    throw error;
  }
}

export function authenticateAPI(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!API_KEY) {
    return next();
  }

  const providedKey = req.headers["x-api-key"] || req.query.apiKey;
  if (providedKey !== API_KEY) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }

  return next();
}

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const clientIP = req.ip ?? req.socket.remoteAddress ?? "unknown";
  const now = Date.now();
  const windowMs = 60_000;

  const entry = rateLimitMap.get(clientIP) ?? {
    count: 0,
    resetTime: now + windowMs,
  };

  if (now > entry.resetTime) {
    entry.count = 0;
    entry.resetTime = now + windowMs;
  }

  if (entry.count >= RATE_LIMIT_PER_MINUTE) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    return res.status(429).json({
      error: "Rate limit exceeded. Please try again later.",
      retryAfter,
    });
  }

  entry.count += 1;
  rateLimitMap.set(clientIP, entry);
  return next();
}

export async function generateProposalHandler(req: Request, res: Response) {
  try {
    const {
      barangay,
      demandMultiplier = 1.0,
      notes,
    } = req.body as {
      barangay: Barangay;
      demandMultiplier?: number;
      notes?: string;
    };

    if (!barangay) {
      return res.status(400).json({
        error: "Barangay data is required",
        example: {
          barangay: {
            name: "San Isidro",
            province: "Laguna",
            population: 2500,
            households: 500,
            avgDailyDemandKWh: 3000,
            solarIrradiance: 4.5,
            hasRiverAccess: true,
            avgWindSpeed: 3.2,
            gridConnected: true,
            currentElectricityCostPerKWh: 12.5,
          },
          demandMultiplier: 1.0,
          notes: "Priority on solar due to available land",
        },
      });
    }

    const requiredFields = [
      "name",
      "province",
      "population",
      "households",
      "avgDailyDemandKWh",
      "solarIrradiance",
      "currentElectricityCostPerKWh",
    ];

    const missingFields = requiredFields.filter(
      (field) => !(field in barangay)
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required barangay fields: ${missingFields.join(", ")}`,
      });
    }

    const energyMix = calculateEnergyMix(barangay, demandMultiplier);
    const financials = calculateFinancials(barangay, energyMix);

    const { text: proposal, source } = await generateREProposal(
      barangay,
      energyMix,
      financials,
      demandMultiplier,
      notes
    );

    return res.json({
      success: true,
      proposal,
      energyMix,
      financials,
      metadata: {
        barangay: `${barangay.name}, ${barangay.province}`,
        demandMultiplier,
        source,
        provider:
          source === "gemini" ? "Google Gemini" : "Smart Local Template",
        timestamp: new Date().toISOString(),
        version: "v1",
      },
    });
  } catch (error) {
    console.error("/generate-proposal error:", error);
    return res.status(500).json({
      error: "Failed to generate proposal",
      message:
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : undefined,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function chatHandler(req: Request, res: Response) {
  try {
    const { message } = req.body as { message?: string };

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
        example: { message: "What projects has the developer built?" },
      });
    }

    const prompt = createPrompt(message);

    if (AI_PROVIDER === "gemini" && geminiClient) {
      try {
        const reply = await generateWithGemini(message, prompt);
        return res.json({
          reply,
          source: "gemini",
          provider: "Google Gemini",
          timestamp: new Date().toISOString(),
          version: "v1",
        });
      } catch (geminiError) {
        console.warn("Gemini API failed:", (geminiError as Error).message);
      }
    }

    const fallbackReply = fallbackBot.generateResponse(message);
    trackQuery(message, "fallback");

    return res.json({
      reply: fallbackReply,
      source: "fallback",
      provider: "Smart Local Responses",
      notice: `Using built-in responses for ${PORTFOLIO_OWNER}.`,
      timestamp: new Date().toISOString(),
      version: "v1",
    });
  } catch (error) {
    console.error("/chat error:", error);
    const fallbackReply = fallbackBot.generateResponse(req.body?.message ?? "");
    return res.status(500).json({
      reply: fallbackReply,
      source: "fallback",
      provider: "Smart Local Responses",
      notice: "Service temporarily unavailable. Using built-in responses.",
      error:
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : undefined,
      timestamp: new Date().toISOString(),
      version: "v1",
    });
  }
}

export function portfolioHandler(_req: Request, res: Response) {
  return res.json({
    data: portfolioData,
    owner: PORTFOLIO_OWNER,
    timestamp: new Date().toISOString(),
    version: "v1",
  });
}

export function healthHandler(_req: Request, res: Response) {
  return res.json({
    status: "healthy",
    server: "running",
    providers: {
      gemini: Boolean(geminiClient),
      fallback: true,
    },
    activeProvider: AI_PROVIDER,
    portfolioOwner: PORTFOLIO_OWNER,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "v1",
  });
}

export function analyticsHandler(_req: Request, res: Response) {
  const topKeywords = Object.entries(analytics.popularKeywords)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  return res.json({
    ...analytics,
    topKeywords,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "v1",
  });
}

export function docsHandler(_req: Request, res: Response) {
  return res.json({
    name: `${PORTFOLIO_OWNER}'s Portfolio Chatbot API + IslaGrid RE Proposal Generator`,
    version: "v1",
    description:
      "Microservice API for portfolio chatbot integration and renewable energy proposal generation",
    endpoints: {
      "POST /api/v1/generate-proposal": {
        description: "Generate renewable energy proposal for a barangay",
        parameters: {
          barangay: "object (required) - Barangay data with energy profile",
          demandMultiplier:
            "number (optional, default: 1.0) - Demand scaling factor",
          notes: "string (optional) - Additional requirements or notes",
        },
        example: {
          barangay: {
            name: "San Isidro",
            province: "Laguna",
            population: 2500,
            households: 500,
            avgDailyDemandKWh: 3000,
            solarIrradiance: 4.5,
            hasRiverAccess: true,
            avgWindSpeed: 3.2,
            gridConnected: true,
            currentElectricityCostPerKWh: 12.5,
          },
          demandMultiplier: 1.2,
          notes: "Priority on solar due to available land",
        },
      },
      "POST /api/v1/chat": {
        description: "Send a message to the chatbot",
        parameters: {
          message: "string (required) - The message to send",
          context: "object (optional) - Additional context",
        },
        example: {
          message: "What projects has the developer built?",
        },
      },
      "GET /api/v1/portfolio": {
        description: "Get portfolio data",
        auth: API_KEY ? "API key required" : "No authentication required",
      },
      "GET /api/v1/health": {
        description: "Health check endpoint",
      },
      "GET /api/v1/analytics": {
        description: "Get usage analytics",
        auth: API_KEY ? "API key required" : "No authentication required",
      },
    },
    authentication: API_KEY
      ? "API key required in X-API-Key header"
      : "No authentication required",
    rateLimit: `${RATE_LIMIT_PER_MINUTE} requests per minute per IP`,
  });
}

export function rootHandler(req: Request, res: Response) {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  return res.json({
    name: `${PORTFOLIO_OWNER}'s Portfolio Chatbot API + IslaGrid RE Proposal Generator`,
    version: "v1",
    status: "running",
    services: ["Portfolio Chatbot", "Renewable Energy Proposal Generator"],
    documentation: `${baseUrl}/api/v1/docs`,
    health: `${baseUrl}/api/v1/health`,
  });
}
