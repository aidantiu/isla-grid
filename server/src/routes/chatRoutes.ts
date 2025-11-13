import express from "express";
import admin from "firebase-admin";
import { getGeminiProposalFromContext } from "../lib/gemini.js";
import type { ContextValue } from "../types/userContextTypes.js";

export const chatRouter = express.Router();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const db = admin.firestore();

chatRouter.post("/", async (req, res) => {
  res.json({
    success: true,
    message: "Hello from chat router",
  });
});

// chatRouter.post("/", async (req, res) => {
//   try {
//     const { userId, prompt } = req.body;

//     if (!userId || !prompt) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing userId or prompt" });
//     }

//     // Fetch user context from Firestore
//     const docSnap = await db.collection("contexts").doc(userId).get();

//     if (!docSnap.exists) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User context not found" });
//     }

//     const userContext: ContextValue = docSnap.data()?.contextValue;

//     const geminiProposal = await getGeminiProposalFromContext(
//       userContext,
//       prompt
//     );

//     if (!geminiProposal) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Failed to generate AI response" });
//     }

//     return res.status(200).json({
//       success: true,
//       userId,
//       input: prompt,
//       output: geminiProposal,
//     });
//   } catch (error: any) {
//     console.error("Chat route error:", error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });

export default chatRouter;
