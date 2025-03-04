export interface ErrorResponse {
  message: string;
  status: number;
  stack?: string;
}

export interface SuccessResponse<T> {
  data: T;
  message: string;
  status: number;
}
