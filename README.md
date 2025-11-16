# IslaGrid

> Hackathon entry by **Team SparkPlug** for the **2025 IDOL Hackathon (Meralco)**. Selected as a **Top 10 finalist** out of 48 submitted proposals.

## Table of Contents

- [Hackathon Context](#hackathon-context)
- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Key Product Features](#key-product-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Client Setup (Next.js)](#client-setup-nextjs)
  - [Server Setup (Express)](#server-setup-express)
  - [Running Locally](#running-locally)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Data Sources](#data-sources)
- [API Reference](#api-reference)
- [Deployment Notes](#deployment-notes)
- [Roadmap and Future Enhancements](#roadmap-and-future-enhancements)
- [Team SparkPlug](#team-sparkplug)
- [Acknowledgements](#acknowledgements)

## Hackathon Context

- Invited to the **2025 IDOL Hackathon Briefing** (Meralco Innovation Development through Open Labs) on **Wednesday, 12 November 2025**.
- Project pitched under team **SparkPlug** and advanced to the **Top 10 finalists** among 48 competing teams.
- Focused on expanding Meralco's clean energy initiatives with community-driven participation.

## Project Overview

IslaGrid is a community energy ecosystem that empowers barangays, LGUs, and cooperatives across the Philippines to co-develop localized renewable energy projects. By combining geospatial datasets, AI-assisted feasibility studies, and community ownership models, IslaGrid lowers the barrier for shared access to solar, hydro, and wind power.

## Problem Statement

- The Philippines possesses rich renewable resources, yet residential communities still shoulder high electricity costs due to dependence on fossil fuels.
- Existing net-metering programs largely exclude households that rely on communal land (e.g., rivers suitable for micro-hydro) because participation is limited to private property owners.
- Families that could benefit from shared natural resources cannot monetize or reinvest those assets without a community-wide framework.

## Proposed Solution

SparkPlug proposes extending Meralco's net-metering program into a **community-centric model**:

- **Generation**: Barangays catalogue their renewable assets (solar irradiance, river access, wind corridors) and simulate feasible installations.
- **Distribution**: Community-owned infrastructure feeds the Meralco grid while distributing savings and rewards (e.g., NFC-linked energy credits) to participating households.
- **AI-Driven Planning**: Residents receive personalized proposals that match their geography, energy demand, and financial capacity.

## Key Product Features

- **Onboarding Wizard** – Collects household location, income, appliance usage, and energy goals to seed AI analysis.
- **AI Proposal Generator** – Generates executive summaries, recommended energy mixes, financial projections, and implementation roadmaps powered by Google Gemini (with offline fallbacks).
- **Conversational Energy Assistant** – Chatbot that contextualizes responses with provincial renewable datasets and user onboarding data.
- **Renewable Mix Explorer** – Displays province-level biomass, solar, hydropower, and wind potential using curated datasets and interactive charts.
- **Community Dashboard** – Tracks projected savings, excess energy earnings, and engagement metrics; prompts NFC registration for unverified users.
- **Localization Support** – Language switcher prepared for multilingual rollout in Filipino and English.

## System Architecture

```
┌──────────────────────────────┐
│         Next.js Client       │
│  - Onboarding UI             │
│  - AI Chat & Proposal flows  │
│  - Dashboard visualizations  │
└──────────────┬───────────────┘
					│ HTTPS (REST)
┌──────────────▼───────────────┐
│        Express Server        │
│  - AI controller (Gemini)    │
│  - Fallback knowledge base   │
│  - Renewable data routes     │
│  - Chat + proposal APIs      │
└──────────────┬───────────────┘
					│ Dataset / Auth
┌──────────────▼───────────────┐
│   Firebase Admin & Storage   │
│   Provincial RE dataset      │
│   Community analytics        │
└──────────────────────────────┘
```

## Tech Stack

**Frontend**

- Next.js 16 (App Router)
- React 19 with Server Actions
- Tailwind CSS 4 and tw-animate-css
- Recharts for data visualization
- Lucide icons

**Backend**

- Express 5 (TypeScript, ESM)
- Google Generative AI (Gemini 1.5 Flash)
- Firebase Admin SDK (Auth, Firestore, Storage)
- Custom fallback chatbot with curated renewable dataset

**Tooling & DevOps**

- TypeScript 5
- ESLint 9 with Next.js config
- TSX for hot reloading in the server
- dotenv for environment configuration

## Repository Structure

```
isla-grid/
├── client/                 # Next.js frontend
│   ├── app/                # App router pages & layouts
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # API utilities and helpers
│   ├── providers/          # Context providers (auth, language)
│   └── types/              # Shared TypeScript definitions
├── server/                 # Express backend
│   ├── src/controllers/    # AI, chat, and proposal handlers
│   ├── src/routes/         # REST API routes
│   ├── src/lib/            # Firebase + fallback chatbot logic
│   ├── src/middlewares/    # Auth and error handling
│   └── data/               # Renewable energy datasets
└── README.md               # Project documentation (this file)
```

## Getting Started

### Prerequisites

- **Node.js** v20 LTS (Next.js 16 requires 18.18+; we recommend 20.11 or later)
- **npm** v10+ (bundled with Node 20)
- Optional: **pnpm** or **yarn** if you prefer alternative package managers
- Google Cloud account for Gemini API access (if AI features will be live)

### Client Setup (Next.js)

```bash
cd client
npm install

# Copy and configure environment variables
cp .env.example .env.local

# Update .env.local as needed
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
# NEXT_PUBLIC_GEMINI_API_KEY=optional_if_client_needs_direct_access
```

### Server Setup (Express)

```bash
cd server
npm install

# Create server/.env with your secrets
cat <<'EOF' > .env
PORT=8000
NODE_ENV=development

# AI configuration
AI_PROVIDER=gemini
GEMINI_API_KEY=your_google_generative_ai_key
ASSISTANT_NAME=IslaBot
RATE_LIMIT_PER_MINUTE=60

# Optional API key for server-to-server calls
# API_KEY=super_secure_key

# Firebase Admin (recommended: load from env, do NOT hardcode)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project.appspot.com

# Dataset override (optional)
# RENEWABLE_DATA_PATH=data/ph_renewable_energy_data.json
EOF
```

### Running Locally

Open two terminals (or use a process manager):

1. **Backend**

   ```bash
   cd server
   npm run dev
   ```

   The Express server listens on `http://localhost:8000` by default.

2. **Frontend**
   ```bash
   cd client
   npm run dev
   ```
   Visit `http://localhost:3000` to use IslaGrid.

Ensure both services are running; the frontend proxies API calls via `NEXT_PUBLIC_API_URL`.

## Available Scripts

| Location | Command         | Description                         |
| -------- | --------------- | ----------------------------------- |
| `client` | `npm run dev`   | Start Next.js in development mode   |
| `client` | `npm run build` | Production build                    |
| `client` | `npm run start` | Run production build locally        |
| `client` | `npm run lint`  | Lint the codebase                   |
| `server` | `npm run dev`   | Start Express with hot reload (tsx) |
| `server` | `npm run build` | TypeScript build to `dist/`         |
| `server` | `npm run start` | Run compiled server                 |

## Environment Variables

### Frontend (`client/.env.local`)

- `NEXT_PUBLIC_API_URL` – Base URL of the Express API (`https://your-domain.com/api/v1` in production).
- `NEXT_PUBLIC_GEMINI_API_KEY` – Optional; only required if the browser app must call Gemini directly (not recommended for public deployments).

### Backend (`server/.env`)

- `PORT` – HTTP port (defaults to 8000).
- `NODE_ENV` – `development` or `production` for logging behavior.
- `AI_PROVIDER` – `gemini` or `knowledge-base` to select AI mode.
- `GEMINI_API_KEY` – Google Generative AI key for proposal and chat responses.
- `ASSISTANT_NAME` – Friendly name for the AI assistant (defaults to IslaBot).
- `API_KEY` – Optional API key to guard endpoints (read by `authenticateAPI`).
- `RATE_LIMIT_PER_MINUTE` – Requests per minute per client IP.
- `RENEWABLE_DATA_PATH` – Custom path to the provincial dataset JSON.
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_STORAGE_BUCKET` – Firebase Admin credentials (store securely).
- Alternative: set `GOOGLE_APPLICATION_CREDENTIALS` to the path of a service account JSON file.

## Data Sources

- `server/data/ph_renewable_energy_data.json` – Curated provincial dataset containing biomass, solar irradiance, hydropower potential, and wind density metrics across the Philippines.
- Supplemental context gathered from Meralco Net-Metering documentation and Philippine Department of Energy publications (citations to be finalized).

## API Reference

| Endpoint                    | Method | Description                                                                                         |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| `/api/v1/chat`              | POST   | AI-powered conversational assistant (accepts `message` and optional `userContext`).                 |
| `/api/v1/generate-proposal` | POST   | Generates a full renewable energy proposal using onboarding data, resource datasets, and Gemini AI. |
| `/api/v1/health`            | GET    | Service health status and active AI provider.                                                       |
| `/api/v1/analytics`         | GET    | Request analytics and keyword trends (may require `API_KEY`).                                       |
| `/api/renewables/mix`       | GET    | Returns renewable potential mix for a given `province` query parameter.                             |
| `/api/chats/*`              | CRUD   | Manages user chat sessions (requires authentication middleware).                                    |
| `/api/contexts/*`           | CRUD   | User context storage endpoints.                                                                     |

Detailed request/response schemas are documented in `server/src/controllers/aiController.ts` (see `docsHandler`).

## Deployment Notes

- **Frontend (Next.js)**: Configure `NEXT_PUBLIC_API_URL` in the hosting platform (e.g., Vercel) to point to your deployed Express server.
- **Backend (Express)**: Host on Render, Railway, Fly.io, or AWS. Ensure Gemini and Firebase credentials are set as environment variables—never commit secrets.
- Preload the renewable energy dataset or connect to a managed datastore for live updates.
- Consider enabling HTTPS and Web Application Firewall (WAF) rules before exposing the API publicly.

## Roadmap and Future Enhancements

- Integrate community financing flows (cooperative shares, loan calculators).
- NFC-based energy credit distribution linked to user accounts.
- Real-time energy production tracking from IoT gateways.
- Expanded language support (Filipino, Cebuano, Ilocano).
- Automated validation of user-uploaded geographic and appliance data.
- Deeper analytics dashboards for LGUs and cooperatives.

## Team SparkPlug

- **Carlos Jerico S. Dela Torre**
- **Rhandie J. Sales Jr.**
- **Gerald S. Berongoy**
- **Aidan R. Tiu**
- **Erwin C. Daguinotas**

## Acknowledgements

- Meralco IDOL Hackathon organizers for the opportunity and mentorship.
- Philippine Department of Energy for renewable resource datasets.
---

_IslaGrid was ideated and built in the spirit of inclusive energy, ensuring that every barangay can participate in the clean energy transition._
