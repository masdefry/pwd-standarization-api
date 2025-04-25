export function AppError(message: string, statusCode: number = 500) {
    const error = new Error(message) as Error & {
      statusCode: number;
      expose: boolean;
    };
  
    error.statusCode = statusCode;
    error.expose = true;
  
    return error;
  }