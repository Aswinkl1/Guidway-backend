import { Router } from "express";
import adminRouter from "./admin/userManagement.routes";
import authRoute from "./auth.routes";
import bookingRouter from "./booking/booking.routes";
import reviewRouter from "./booking/review.routes";
import availabilityRouter from "./mentor/availability.routes";
import mentorRouter from "./mentor/mentor.routes";
import profileRoutes from "./mentor/profile.routes";
import sessionRouter from "./mentor/session.routes";
import settingRoutes from "./mentor/settings.routes";
import userRouter from "./user/user.routes";

const route = Router();

route.use(authRoute);
route.use("/", bookingRouter);
route.use("/admin", adminRouter);
route.use("/mentor", availabilityRouter);
route.use("/mentor", profileRoutes);
route.use("/user", userRouter);
route.use("/mentor", settingRoutes);
route.use("/mentor", sessionRouter);
route.use("/mentor", mentorRouter);
route.use("/", reviewRouter);
export default route;
