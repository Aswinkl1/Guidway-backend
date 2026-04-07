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
} as const;
