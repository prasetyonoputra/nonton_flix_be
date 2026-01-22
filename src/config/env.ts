import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST!,
  DB_NAME: process.env.DB_NAME!,
  DB_USER: process.env.DB_USER!,
  DB_PASS: process.env.DB_PASS!,
  JWT_SECRET: process.env.JWT_SECRET!,
};
