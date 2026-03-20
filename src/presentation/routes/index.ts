import { Router } from "express";
import router from "./admin/userManagement.routes";
import authRoute from "./auth.routes";

const route = Router();

route.use(authRoute);
route.use("/admin", router);
export default route;
