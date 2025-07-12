import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import gadgetRoutes from "./routes/gadget.route.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/gadgets", gadgetRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
