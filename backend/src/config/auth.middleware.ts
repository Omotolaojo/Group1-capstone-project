import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

/**
 * ============================================================
 * AUTHENTICATED USER TYPE
 * ============================================================
 */

export type AuthenticatedUser = {
  userId: string;
  email: string;
  role: string;
};


/**
 * ============================================================
 * EXTEND EXPRESS REQUEST
 * ============================================================
 *
 * This allows us to use:
 *
 * req.user
 *
 * inside controllers.
 */

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}


/**
 * ============================================================
 * AUTHENTICATE TOKEN MIDDLEWARE
 * ============================================================
 */

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Make sure JWT_SECRET exists.
     */
    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is not configured"
      );

      return res.status(500).json({
        success: false,
        message:
          "Authentication service is not configured correctly",
      });
    }


    /**
     * Get JWT from HTTP-only cookie.
     *
     * This requires cookie-parser
     * to be registered in app.ts.
     */
    const token =
      req.cookies?.token;


    /**
     * No token means
     * user is not authenticated.
     */
    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
    }


    /**
     * Verify JWT.
     */
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as AuthenticatedUser;


    /**
     * Attach decoded user
     * to Express request.
     */
    req.user = decoded;


    /**
     * Continue to controller.
     */
    next();

  } catch (error) {

    console.error(
      "AUTHENTICATION ERROR:",
      error
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired authentication token",
    });
  }
};