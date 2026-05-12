import { Router } from "express";
import adminRouter from "./admin/userManagement.routes";
import authRoute from "./auth.routes";
import profileRoutes from "./mentor/profile.routes";
import settingRoutes from "./mentor/settings.routes";
import userRouter from "./user/user.routes";

const route = Router();

route.use(authRoute);
route.use("/admin", adminRouter);
route.use("/mentor", profileRoutes);
route.use("/user", userRouter);
route.use("/mentor", settingRoutes);

export default route;
