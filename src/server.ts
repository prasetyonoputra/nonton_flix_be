import "dotenv/config";
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
