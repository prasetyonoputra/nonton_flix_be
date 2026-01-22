import { JwtUserPayload } from "../utils/jwt-payload.interface";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}
