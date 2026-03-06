export type SuccessResponse<T> = {
  success: true;
  message: string;
  result: T;
};

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
