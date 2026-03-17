import router from "./admin/userManagement.routes";
import authRoute from "./auth.routes";

import { Router } from "express";

const route = Router();

route.use(authRoute);
route.use("/admin", router);
export default route;
