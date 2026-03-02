import { ArgonPasswordHasher } from "@infrastructure/services/ArgonHashService";
import { NodemailerEmailService } from "@infrastructure/services/NodemailerEmailService";
import { TokenService } from "@infrastructure/services/TokenServices";

const passwordHasher = new ArgonPasswordHasher();
const tokenService = new TokenService(
  process.env.JWT_ACCESSTOKEN_SECRET!,
  process.env.JWT_ACCESSTOKEN_EXPIRES_IN ?? "15min",
);
const emailService = new NodemailerEmailService();
export { passwordHasher, tokenService, emailService };
