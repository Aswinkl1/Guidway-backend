import app from "./presentation/server.js";
import { config } from "dotenv";
config();
app.listen(3000, () => console.log("server is running on port 3000"));
