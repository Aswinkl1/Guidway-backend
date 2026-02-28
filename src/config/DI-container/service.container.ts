import { ArgonPasswordHasher } from "@infrastructure/services/ArgonHashService";
import { TokenService } from "@infrastructure/services/TokenServices";

const passwordHasher = new ArgonPasswordHasher();
const tokenService = new TokenService();

export { passwordHasher, tokenService };
