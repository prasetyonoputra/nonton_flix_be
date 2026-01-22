import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtUserPayload {
  id: number;
  email: string;
}

export const signToken = (payload: object) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): JwtUserPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtUserPayload;
  return decoded;
};
