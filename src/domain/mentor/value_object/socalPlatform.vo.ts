const PLATFORM_PATTERNS = [
	{ platform: "facebook", pattern: /facebook\.com|fb\.com/i },
	{ platform: "instagram", pattern: /instagram\.com/i },
	{ platform: "twitter", pattern: /twitter\.com|x\.com/i },
	{ platform: "linkedin", pattern: /linkedin\.com/i },
	{ platform: "youtube", pattern: /youtube\.com|youtu\.be/i },
	{ platform: "github", pattern: /github\.com/i },
	{ platform: "tiktok", pattern: /tiktok\.com/i },
	{ platform: "pinterest", pattern: /pinterest\.com/i },
	{ platform: "website", pattern: /.*/i },
] as const;

export type PlatformType =
	| "facebook"
	| "instagram"
	| "twitter"
	| "linkedin"
	| "youtube"
	| "github"
	| "tiktok"
	| "pinterest"
	| "website";

export class SocialPlatform {
	private constructor(private readonly _value: PlatformType) {}

	static fromUrl(url: string): SocialPlatform {
		const match = PLATFORM_PATTERNS.find(({ pattern }) => pattern.test(url));
		return new SocialPlatform((match?.platform ?? "website") as PlatformType);
	}

	get value(): PlatformType {
		return this._value;
	}
}
