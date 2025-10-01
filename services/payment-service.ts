type TransferRequest = {
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  amount: number;
  note?: string;
  currentBalance: number;
};

type TransferResponse = {
  success: boolean;
  statusCode: number; // HTTP status code
  transactionId?: string;
  message: string;
  errorCode?: string;
  timestamp: string;
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

const simulateNetworkDelay = (ms: number = 1500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const shouldSimulateError = () => {
  return Math.random() < 0.1; // 10% chance of error
};

export const processTransfer = async (
  request: TransferRequest
): Promise<TransferResponse> => {
  try {
    if (!request.recipientId || !request.recipientName) {
      return {
        success: false,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: "Invalid recipient information",
        errorCode: "INVALID_RECIPIENT",
        timestamp: new Date().toISOString(),
      };
    }

    if (request.amount <= 0) {
      return {
        success: false,
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: "Amount must be greater than zero",
        errorCode: "INVALID_AMOUNT",
        timestamp: new Date().toISOString(),
      };
    }

    if (request.currentBalance < request.amount) {
      return {
        success: false,
        statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        message: "Insufficient funds in your account",
        errorCode: "INSUFFICIENT_FUNDS",
        timestamp: new Date().toISOString(),
      };
    }

    await simulateNetworkDelay(1500);

    if (shouldSimulateError()) {
      return {
        success: false,
        statusCode: HTTP_STATUS.SERVICE_UNAVAILABLE,
        message: "Service temporarily unavailable. Please try again.",
        errorCode: "SERVICE_UNAVAILABLE",
        timestamp: new Date().toISOString(),
      };
    }

    const transactionId = `TXN${Date.now()}${Math.random().toString(36).slice(2, 9).toUpperCase()}`;

    return {
      success: true,
      statusCode: HTTP_STATUS.CREATED,
      transactionId,
      message: "Transfer completed successfully",
      timestamp: new Date().toISOString(),
    };
  } catch {
    return {
      success: false,
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "An unexpected error occurred. Please try again later.",
      errorCode: "INTERNAL_ERROR",
      timestamp: new Date().toISOString(),
    };
  }
};
