import https from "node:https";
import type { IOAuthUseCase } from "@application/ports/usecase/IOAuth.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { EnvConfig } from "@config/env";
import { Role } from "@domain/entities/user";
import axios from "axios";
import { inject, injectable } from "inversify";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as OAuth2Strategy } from "passport-oauth2";
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
					callbackURL: EnvConfig.GOOGLE_CALLBACK_URL,
					scope: ["openid", "profile", "email"],
				},
				async (_, __, profile, done) => {
					try {
						console.log(profile);
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
						done(null, result as unknown as Express.User);
					} catch (error) {
						done(error as Error);
					}
				},
			),
		);

		passport.use(
			new OAuth2Strategy(
				{
					authorizationURL: EnvConfig.LINKEDIN_AUTHORIZATION_URL,
					tokenURL: EnvConfig.LINKEDIN_TOKEN_URL,
					clientID: EnvConfig.LINKEDIN_CLIENT_ID,
					clientSecret: EnvConfig.LINKEDIN_CLIENT_SECRET,
					callbackURL: EnvConfig.LINKEDIN_CALLBACK_URL,
					scope: ["openid", "profile", "email"],
				},
				// biome-ignore lint/suspicious/noExplicitAny: third-party API returns an unpredictable object
				async (accessToken: string, _: any, __: any, done: any) => {
					try {
						console.log("yododod");
						const response = await axios.get(
							EnvConfig.LINKEDIN_GET_USERINFO_URL,
							{
								headers: { Authorization: `Bearer ${accessToken}` },
								httpsAgent: new https.Agent({ family: 4 }),
							},
						);
						const userData = response.data;

						const oAuthInputDTO = {
							email: userData.email,
							name: userData.name,
							providerId: userData.sub,
							role: Role.MENTOR,
						};

						const result = await this._oAuthUseCase.execute(oAuthInputDTO);
						done(null, result as unknown as Express.User);
					} catch (error) {
						done(error, null);
					}
				},
			),
		);
	}
}
