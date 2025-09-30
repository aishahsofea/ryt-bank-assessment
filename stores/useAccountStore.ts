import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Transaction = {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  amount: number;
  note: string;
  date: string;
  status: "pending" | "completed" | "failed";
  type: "sent" | "received";
};

type AccountState = {
  accountNumber: string;
  balance: number;
  accountHolderName: string;
  transactions: Transaction[];
  isLoading: boolean;

  setBalance: (balance: number) => void;
  deductBalance: (amount: number) => boolean;
  addTransaction: (
    transaction: Omit<Transaction, "id" | "date" | "status">
  ) => string;
  updateTransactionStatus: (id: string, status: Transaction["status"]) => void;
  getRecentTransactions: (limit?: number) => Transaction[];
  clearTransactions: () => void;
  resetAccount: () => void;
};

// TODO: Fetch from API
const initialState = {
  balance: 1234.0,
  accountNumber: "1234567890",
  accountHolderName: "John Doe",
  transactions: [],
  isLoading: false,
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setBalance: (balance: number) => set({ balance }),

      deductBalance: (amount: number): boolean => {
        const currentBalance = get().balance;
        if (currentBalance >= amount) {
          set({ balance: currentBalance - amount });
          return true;
        }
        return false;
      },

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString(),
          status: "pending",
        };

        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));

        return newTransaction.id;
      },

      updateTransactionStatus: (id: string, status: Transaction["status"]) => {
        set((state) => ({
          transactions: state.transactions.map((txn) =>
            txn.id === id ? { ...txn, status } : txn
          ),
        }));
      },

      getRecentTransactions: (limit = 10) => {
        const transactions = get().transactions;
        return transactions
          .filter((txn) => txn.status === "completed")
          .slice(0, limit);
      },

      clearTransactions: () => {
        set({ transactions: [] });
      },

      resetAccount: () => {
        set(initialState);
      },
    }),
    {
      name: "account-storage", // unique name
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state): Partial<AccountState> => ({
        balance: state.balance,
        accountNumber: state.accountNumber,
        accountHolderName: state.accountHolderName,
        transactions: state.transactions,
      }),
    }
  )
);
