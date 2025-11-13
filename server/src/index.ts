import express from "express";
import { contextRouter } from "./routes/contextRoutes.js";
import cors from "cors";
import authenticate from "./middlewares/authenticate.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { chatRouter } from "./routes/chatRoutes.js";

const app = express();
const port = 8000;

// CORS config
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// process authentication
app.use(authenticate);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for the homepage
app.get("/", (req, res) => {
  res.send("Welcome to the Express.js Application!");
});

app.use("/api/contexts", contextRouter);
app.use("/api/chat", chatRouter);

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/**
 *
 *
 */
