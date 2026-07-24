import { Router } from "express";

import {
  createClaim,
  getAllClaims,
  getPendingClaims,
} from "../controllers/claims.controllers";

const router = Router();

// GET pending claims
// GET /api/claims
router.get("/", getPendingClaims);

// GET all claims
// GET /api/claims/all
router.get("/all", getAllClaims);

// CREATE a new claim
// POST /api/claims
router.post("/", createClaim);

export default router;