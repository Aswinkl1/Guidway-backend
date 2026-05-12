export const ROUTES = {
	AUTH: {
		ROOT: "/",
		SIGNUP: "/signup",
		VERIFY: "/verify",
		REFRESH: "/refresh",
		LOGIN: "/login",
		FORGET_PASSWORD: "/forget-password",
		RESET_PASSWORD: "/reset-password",
		ADMIN_LOGIN: "/admin/login",
		LOGOUT: "/logout",
		UPLOAD_URL: "/upload-url",
		GOOGLE_AUTH: "/auth/google",
		GOOGLE_CALLBACK: "/auth/google/callback",
		LINKEDIN_AUTH: "/auth/linkedin",
		LINKEDIN_CALLBACK: "/auth/linkedin/callback",
	},
	MENTOR: {
		ROOT: "/",
		DETAIL: "/:id",
		EDUCATION: { ROOT: "/education", DETAIL: "/education/:id" },
		EXPERIENCE: { ROOT: "/experience", DETAIL: "/experience/:id" },
		ACHIEVEMENT: { ROOT: "/achievement", DETAIL: "/achievement/:id" },
		SKILL: {
			ROOT: "/skill",
			DETAIL: "/skill/:id",
		},
		PROFILE: {
			ROOT: "/profile",
		},
		LANGUAGE: {
			ROOT: "/language",
			DETAIL: "/language/:id",
		},
		DOMAIN: {
			ROOT: "/domain",
			DETAIL: "/domian/:id",
		},
		SOCIALMEDIA_LINKS: {
			ROOT: "/socialMediaLink",
		},
		SETTINGS: {
			ROOT: "/settings",
			BOOKINGRULES: "/settings/bookingrules",
			NOTIFICAION_RULES: "/settings/notificationrules",
		},
	},
	USER: {
		ROOT: "/",
		DETAIL: "/:id",
	},
} as const;
