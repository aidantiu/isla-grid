import express from "express";
import { readingsRouter } from "./routes/readingsRoute.js";
import { contextRouter } from "./routes/contextRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import cors from "cors";

const app = express();
const port = 8000;

// CORS config
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for the homepage
app.get("/", (req, res) => {
  res.send("Welcome to the Express.js Application!");
});

app.use("/api/chat", chatRouter);

app.use("/api/readings", readingsRouter);

app.use("/api/contexts", contextRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
