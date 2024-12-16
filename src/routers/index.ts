import { Router } from "express";
// import { brandRouter } from "./brandRouter.ts";
import { userRouter } from "./userRouter.ts";
import { typeRouter } from "./typeRouter.ts";
// import { deviceRouter } from "./deviceRouter.ts";

export const router = Router();
router.use("/user", userRouter);
router.use("/type", typeRouter);
// router.use("/brand", brandRouter);
// router.use("/device", deviceRouter);
