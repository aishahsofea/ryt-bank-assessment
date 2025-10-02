import { processTransfer, TransferRequest } from "@/services/payment-service";
import { useAccountStore } from "@/stores/useAccountStore";
import { useRecipientStore } from "@/stores/useRecipientStore";
import { useMutation } from "@tanstack/react-query";

type MutationRequest = Omit<TransferRequest, "currentBalance">;

export const useTransferMutation = () => {
  const mutation = useMutation({
    mutationFn: async (request: MutationRequest) => {
      const currentBalance = useAccountStore.getState().balance;
      const response = await processTransfer({
        ...request,
        currentBalance,
      });
      return response;
    },
    onSuccess: (data, variables) => {
      if (isSuccessStatus(data.statusCode) && data.transactionId) {
        const deductSuccess = useAccountStore
          .getState()
          .deductBalance(variables.amount);

        if (deductSuccess) {
          const txnId = useAccountStore.getState().addTransaction({
            recipientId: variables.recipientId,
            recipientName: variables.recipientName,
            recipientEmail: variables.recipientEmail,
            amount: variables.amount,
            note: variables.note || "",
            type: "sent",
          });

          useAccountStore
            .getState()
            .updateTransactionStatus(txnId, "completed");

          useRecipientStore
            .getState()
            .incrementTransactionCount(variables.recipientId);

          console.log("Transfer successful:", data.message);
        } else {
          console.error("Failed to deduct balance.");
        }
      }
    },
    onError: (error) => {
      console.error("Transfer failed:", error);
    },
    retry: (failureCount, error: any) => {
      const statusCode = error.response?.statusCode;

      if (isServerError(statusCode)) {
        return failureCount < 2;
      }

      if (isClientError(statusCode)) {
        return false;
      }

      return failureCount < 1;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
  });

  return mutation;
};

const isSuccessStatus = (statusCode: number): boolean => {
  return statusCode >= 200 && statusCode < 300;
};

const isClientError = (statusCode: number): boolean => {
  return statusCode >= 400 && statusCode < 500;
};

const isServerError = (statusCode: number): boolean => {
  return statusCode >= 500 && statusCode < 600;
};
