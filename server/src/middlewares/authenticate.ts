import { RequestHandler } from "express";
import { getAuth } from "firebase-admin/auth";

const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // If there's no Bearer token, proceed as unauthenticated
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.userId = undefined;
      return next();
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
      const decoded = await getAuth().verifyIdToken(idToken);
      req.userId = decoded.uid;
    } catch (err) {
      req.userId = undefined;
    }

    next();
  } catch (error) {
    req.userId = undefined;
    next();
  }
};

export default authenticate;
