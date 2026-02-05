import { Router } from "express";
import authRoutes from "./authRoutes";

const router = Router();
console.log("from auth routes");

router.use("/auth", authRoutes);

export default router;
