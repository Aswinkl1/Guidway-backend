export interface SuccessResponse<T> {
  success: true;
  message: string;
  result: T;
}

export interface ErrorResponse<T> {
  success: false;
  message: string;
  errors: T;
}

// TODO : change the result to data
export function createSuccess<T>(
  message: string,
  result: T,
): SuccessResponse<T> {
  return {
    success: true,
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
