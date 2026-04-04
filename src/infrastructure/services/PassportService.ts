import type { IOAuthUseCase } from "@application/ports/usecase/IOAuth.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { EnvConfig } from "@config/env";
import { Role } from "@domain/entities/user";
import { inject, injectable } from "inversify";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";

@injectable()
export class PassportConfig {
	constructor(
		@inject(TYPES.OAuthUseCase) private readonly _oAuthUseCase: IOAuthUseCase,
	) {}

	public config(): void {
		passport.use(
			new GoogleStrategy(
				{
					clientID: EnvConfig.GOOGLE_CLIENT_ID,
					clientSecret: EnvConfig.GOOGLE_CLIENT_SECRET,
					callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
					scope: ["openid", "profile", "email"],
				},
				async (_, __, profile, done) => {
					try {
						console.log("hello");
						const email = profile.emails?.[0]?.value;
						const name = profile.displayName;
						const providerId = profile.id;

						if (!email) {
							return done(new Error("No email found in Google profile"));
						}

						const oAuthInputDTO = {
							email,
							name,
							providerId,
							role: Role.MENTEE,
						};

						const result = await this._oAuthUseCase.execute(oAuthInputDTO);
						done(null, result);
					} catch (error) {
						done(error as Error);
					}
				},
			),
		);

		passport.use(
			new LinkedInStrategy(
				{
					clientID: EnvConfig.LINKEDIN_CLIENT_ID,
					clientSecret: EnvConfig.LINKEDIN_CLIENT_SECRET,
					callbackURL: "http://localhost:3000/api/v1/linkedin/callback",
					scope: ["openid", "profile", "email"],
				},
				async (_, __, profile, done) => {
					try {
						console.log("LinkedIn profile:", profile); // Debugging line to check the profile structure
						const email = profile.emails?.[0]?.value;
						const name = profile.displayName;
						const providerId = profile.id;

						if (!email) {
							return done(
								new Error("No email found in LinkedIn profile"),
								null,
							);
						}

						const oAuthInputDTO = {
							email,
							name,
							providerId,
							role: Role.MENTOR,
						};

						const result = await this._oAuthUseCase.execute(oAuthInputDTO);
						done(null, result);
					} catch (error) {
						done(error as Error);
					}
				},
			),
		);
	}
}
