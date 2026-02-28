import { ArgonPasswordHasher } from "@infrastructure/services/ArgonHashService";

export const passwordHasher = new ArgonPasswordHasher();
