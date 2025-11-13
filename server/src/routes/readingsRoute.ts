import { Router } from "express";
import { ApiRequest } from "../types/apiTypes.js";
import {
  CreateReadingDTO,
  Reading,
  ReadingCore,
} from "../types/readingTypes.js";
import { randomUUID } from "crypto";
import {
  createApiResponse,
  createErrorApiResponse,
  createSuccessApiResponse,
} from "../utils/apiUtils.js";
import { db } from "../lib/firebase.js";

export const readingsRouter = Router();

/**
 * CREATE A READING
HTTP Request: 
POST /api/readings
Permissions: 
Admin only
Path Parameters: 
Query Parameters: 
Request Header: 
authToken
Request Body: 
ApiRequestBody<CreateReadingDTO>
Response body: 
ApiResponseBody<Reading>

 */
readingsRouter.post("/", async (req, res) => {
  // ✅ Validate request body
  const body = req.body as ApiRequest<CreateReadingDTO>;
  const createReadingDTO = body.payload;

  if (
    !createReadingDTO.communityId ||
    typeof createReadingDTO.energyProduction !== "number" ||
    typeof createReadingDTO.energyRate !== "number" ||
    typeof createReadingDTO.dateStart !== "number" ||
    typeof createReadingDTO.dateEnd !== "number" ||
    typeof createReadingDTO.pesoEquivalent !== "number"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing fields in request body.",
    });
  }

  const readingId = randomUUID();

  // create reading core
  const readingCore: ReadingCore = {
    ...createReadingDTO,
    distribution: [
      {
        id: "none",
        name: "unassigned",
        stocks: 0,
      },
    ],
    status: "active",
    readingId: readingId,
  };

  // creating complete reading
  const newReading: Reading = {
    ...readingCore,
    id: readingId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // ✅ Save to database
  // await readingsDB.insert(newReading);

  await db.collection("readings").doc(readingId).set(newReading);

  // ✅ Respond
  return res
    .status(201)
    .json(createApiResponse(true, "Reading created successfully", newReading));
});

/**
 * LIST READINGS
HTTP Request: 
GET /api/readings
Permissions: 
Admin only
Path Parameters: 
Query Parameters: 
limit : int - number of objects requested 
nextPageToken : string - if retrieving the next page, the token from the previous call must be passed. 
Request Header: 
authToken
Request Body: 
Response body: 
ApiResponseBody<{result:Reading[]; nextPageToken:string}>

 */
readingsRouter.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const nextPageToken = (req.query.nextPageToken as string) || null;

  let query = db
    .collection("readings")
    .orderBy("createdAt", "desc")
    .limit(limit);

  if (nextPageToken) {
    const lastDoc = await db.collection("readings").doc(nextPageToken).get();

    if (lastDoc.exists) {
      query = query.startAfter(lastDoc);
    }
  }

  const snapshot = await query.get();
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Reading[];

  res.status(200).json(
    createSuccessApiResponse("readings fetched", {
      result: data,
      nextPageToken: data[data.length - 1].id,
    })
  );
});

/** 
 * get a specific reading
GET /api/reading/{readingId}

 */
readingsRouter.get("/:readingId", async (req, res) => {
  const { readingId } = req.params;
  const doc = await db.collection("readings").doc(readingId).get();

  if (!doc.exists) {
    return res.status(404).json(createErrorApiResponse("Blog not found"));
  }

  const data = { id: doc.id, ...doc.data() } as Reading;

  res.json(createSuccessApiResponse("readings fetched", data));
});


/**
 * delete a specific reading
 * DELETE api/readings/{readingId}
 */
readingsRouter.delete("/:readingId", async (req, res) => {
  const { readingId } = req.params;

  const doc = await db.collection("readings").doc(readingId).get();
  if (!doc.exists) {
    return res.status(404).json(createErrorApiResponse("Reading not found"));
  }

  const reading = doc.data() as Reading;

  await db.collection("readings").doc(readingId).delete();

  res.json(createSuccessApiResponse("Reading deleted successfully", reading));
});
