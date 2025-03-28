import { NavigateFunction } from "react-router-dom";

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface ErrorHandlerConfig {
  navigate?: NavigateFunction;
  loginRedirectPath?: string;
  showNotification?: (message: string, type: string) => void;
}

export let globalConfig: ErrorHandlerConfig = {};

export function configureErrorHandler(config: ErrorHandlerConfig): void {
  globalConfig = { ...globalConfig, ...config };
}

export function checkAuthToken(): string | null {
  const token = localStorage.getItem("token");
  if (!token) {
    if (globalConfig.navigate) {
      if (globalConfig.showNotification) {
        globalConfig.showNotification(
          "No authentication token found. Please login.",
          "error"
        );
      }
      globalConfig.navigate(globalConfig.loginRedirectPath || "/login");
      return null;
    }

    throw new ApiError("No authentication token found. Please login.", 401);
  }
  return token;
}

export function handleApiResponse(response: Response): void {
  if (response.status === 401) {
    console.error(
      "Authentication expired. Redirecting to login page.",
      response
    );
    if (globalConfig.navigate) {
      if (globalConfig.showNotification) {
        globalConfig.showNotification(
          `${response.statusText}. \n\nPlease login again.`,
          "error"
        );
      }
      globalConfig.navigate(globalConfig.loginRedirectPath || "/login");
      return;
    }
    throw new ApiError("Authentication expired. Please login again.", 401);
  }

  if (!response.ok) {
    const errorMessage = `API request failed with status ${response.status}`;
    if (globalConfig.showNotification) {
      globalConfig.showNotification(errorMessage, "error");
      return;
    }
    throw new ApiError(errorMessage, response.status);
  }
}

export function handleApiError(error: any, url: string): void | never {
  console.error(`API Error:`, error);

  const errorMessage =
    error instanceof ApiError
      ? error.message
      : `Failed to fetch data from ${url}: ${error.message}`;

  if (globalConfig.showNotification) {
    globalConfig.showNotification(errorMessage, "error");
    return;
  }

  if (error instanceof ApiError) {
    throw error;
  }
  throw new ApiError(errorMessage);
}
