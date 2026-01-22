import app from "./app";
import { sequelize } from "./config/sequelize";
import { env } from "./config/env";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Server error:", error);
    process.exit(1);
  }
})().catch((err) => {
  console.error("Server error:", err);
});
