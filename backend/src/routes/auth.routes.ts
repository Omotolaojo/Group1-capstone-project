import { Router } from "express";

import {
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controllers";

const router = Router();

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/logout",
  logoutUser
);

router.get(
  "/users",
  getUsers
);

export default router;