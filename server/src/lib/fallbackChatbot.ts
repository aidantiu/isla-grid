export interface PortfolioProject {
  name?: string;
  description?: string;
  impact?: string;
}

export interface PortfolioExperience {
  role?: string;
  company?: string;
  period?: string;
  summary?: string;
}

export interface PortfolioSkills {
  languages?: string[];
  frameworks?: string[];
  databases?: string[];
  tools?: string[];
  [key: string]: string[] | undefined;
}

export interface PortfolioData {
  profile?: string;
  projects?: PortfolioProject[];
  skills?: PortfolioSkills;
  experience?: PortfolioExperience[];
  education?: Record<string, string | string[]>;
  certifications?: string[];
  contact?: Record<string, string>;
}

const DEFAULT_RESPONSE =
  "I'm the portfolio assistant and can only help with questions about professional background, projects, skills, education, and career achievements. Please ask about those topics!";

export class FallbackChatbot {
  constructor(private readonly portfolioData: PortfolioData) {}

  generateResponse(message: string): string {
    const normalized = message.toLowerCase();
    const {
      profile,
      projects = [],
      skills = {},
      experience = [],
      education = {},
      certifications = [],
      contact = {},
    } = this.portfolioData || {};

    if (!normalized.trim()) {
      return DEFAULT_RESPONSE;
    }

    if (normalized.includes("project")) {
      if (!projects.length) {
        return "The portfolio does not list any projects yet, but the owner is open to sharing recent work upon request.";
      }

      const summary = projects
        .slice(0, 3)
        .map((project) => {
          const details = [project.description, project.impact]
            .filter(Boolean)
            .join(" — ");
          return `• ${project.name ?? "Unnamed project"}${
            details ? `: ${details}` : ""
          }`;
        })
        .join("\n");

      return `Here are a few highlighted projects:\n${summary}`;
    }

    if (normalized.includes("skill") || normalized.includes("tech")) {
      const sections = Object.entries(skills)
        .filter(([, items]) => Array.isArray(items) && items.length)
        .map(
          ([category, items]) =>
            `${this.capitalize(category)}: ${items!.join(", ")}`
        );

      return sections.length
        ? `Key skills and tools include:\n${sections.join("\n")}`
        : "The skills inventory has not been populated yet.";
    }

    if (
      normalized.includes("experience") ||
      normalized.includes("work") ||
      normalized.includes("career")
    ) {
      if (!experience.length) {
        return "Professional experience details have not been provided yet.";
      }

      const summary = experience
        .slice(0, 2)
        .map((item) => {
          const headerParts = [item.role, item.company, item.period]
            .filter(Boolean)
            .join(" • ");
          return `• ${headerParts || "Role details"}${
            item.summary ? `\n  ${item.summary}` : ""
          }`;
        })
        .join("\n");

      return `Recent professional experience:\n${summary}`;
    }

    if (normalized.includes("education") || normalized.includes("school")) {
      const entries = Object.entries(education)
        .map(([key, value]) => {
          const valueText = Array.isArray(value) ? value.join(", ") : value;
          return `${this.capitalize(key)}: ${valueText}`;
        })
        .join("\n");

      return entries
        ? `Educational background:\n${entries}`
        : "Education details have not been provided yet.";
    }

    if (normalized.includes("certification")) {
      return certifications.length
        ? `Certifications earned: ${certifications.join(", ")}`
        : "No certifications are listed in the portfolio.";
    }

    if (normalized.includes("contact") || normalized.includes("reach")) {
      const entries = Object.entries(contact)
        .map(([type, value]) => `${this.capitalize(type)}: ${value}`)
        .join("\n");

      return entries
        ? `You can reach the portfolio owner via:\n${entries}`
        : "Contact details are not available at the moment.";
    }

    if (profile) {
      return profile;
    }

    return DEFAULT_RESPONSE;
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
