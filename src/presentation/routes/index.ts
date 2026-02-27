import authRoute from "./auth.routes";

import { Router } from "express";

const route = Router();

route.use(authRoute);

export default route;
