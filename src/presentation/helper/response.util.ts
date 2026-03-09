export type SuccessResponse<T> = {
  success: true;
  message: string;
  result: T;
};

export type ErrorResponse<T> = {
  success: false;
  message: string;
  errors: T;
};

export function createSuccess<T>(
  message: string,
  result: T,
): SuccessResponse<T> {
  return {
    success: true as const,
    message,
    result,
  };
}

export function createError<T>(message: string, errors: T): ErrorResponse<T> {
  return {
    success: false as const,
    message,
    errors,
  };
}
