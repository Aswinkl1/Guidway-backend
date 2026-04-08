export const MESSAGES = {
  AUTH: {
    SUCCESS: {
      LOGOUT: "Logout successful",
      SIGNUP: "Signup successful",
      EMAIL_VERIFIED: "Email verification successful",
      LOGIN: "Login successful",
      FORGET_PASSWORD_SENT: "Check your email",
      RESET_PASSWORD: "Password changed successfully",
      TOKEN_REFRESHED: "Request successful",
      ADMIN_LOGIN: "Admin login successful",
      UPLOAD_URL_GENERATED: "Upload URL generated",
    },
    ERROR: {
      TOKEN_NOT_FOUND: "Token is not found",
      USER_NOT_AUTHENTICATED: "User not authenticated",
      FILE_TYPE_REQUIRED: "File type is required",
    },
  },
} as const;
