import { Router } from "express";
import adminRouter from "./admin/userManagement.routes";
import authRoute from "./auth.routes";
import router from "./mentor/profile.routes";
import userRouter from "./user/user.routes";

const route = Router();

route.use(authRoute);
route.use("/admin", adminRouter);
route.use("/mentor", router);
route.use("/user", userRouter);
export default route;
