import { Router } from "express";
import adminRouter from "./admin/userManagement.routes";
import authRoute from "./auth.routes";
import router from "./mentor/profile.routes";

const route = Router();

route.use(authRoute);
route.use("/admin", adminRouter);
route.use("/mentor", router);
export default route;
