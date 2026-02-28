import { ArgonPasswordHasher } from "@infrastructure/services/argonPasswordHasher";

export const passwordHasher = new ArgonPasswordHasher();
