import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Recipient = {
  id: string;
  name: string;
  email: string;
  initials: string;
  accountType: string;
  lastTransactionDate?: string;
  totalTransactions: number;
  isFavorite: boolean;
};

type RecipientState = {
  recipients: Recipient[];

  // NOTE: Some of the methods below are not used in the app but are provided for completeness
  addRecipient: (
    recipient: Omit<Recipient, "id" | "totalTransactions" | "isFavorite">
  ) => string;
  removeRecipient: (id: string) => void;
  updateRecipient: (id: string, updates: Partial<Recipient>) => void;
  getRecipientById: (id: string) => Recipient | undefined;
  getRecentRecipients: (limit?: number) => Recipient[];
  getFavoriteRecipients: () => Recipient[];
  toggleFavorite: (id: string) => void;
  incrementTransactionCount: (id: string) => void;
  searchRecipients: (query: string) => Recipient[];
};

const ONE_DAY = 24 * 60 * 60 * 1000;

const mockRecipients: Recipient[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    initials: "SC",
    accountType: "Bank account ending in 1234",
    totalTransactions: 5,
    isFavorite: true,
    lastTransactionDate: new Date(Date.now() - ONE_DAY * 2).toISOString(), // 2 days ago
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike.j@email.com",
    initials: "MJ",
    accountType: "Bank account ending in 5678",
    totalTransactions: 3,
    isFavorite: false,
    lastTransactionDate: new Date(Date.now() - ONE_DAY * 7).toISOString(), // 7 days ago
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.d@email.com",
    initials: "ED",
    accountType: "Bank account ending in 9012",
    totalTransactions: 8,
    isFavorite: true,
    lastTransactionDate: new Date(Date.now() - ONE_DAY).toISOString(), // 1 day ago
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.w@email.com",
    initials: "JW",
    accountType: "Bank account ending in 3456",
    totalTransactions: 1,
    isFavorite: false,
    lastTransactionDate: new Date(Date.now() - ONE_DAY * 30).toISOString(), // 30 days ago
  },
];

export const useRecipientStore = create<RecipientState>()(
  persist(
    (set, get) => ({
      recipients: mockRecipients,

      addRecipient: (recipient) => {
        const newRecipient: Recipient = {
          ...recipient,
          id: `RCP${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
          totalTransactions: 0,
          isFavorite: false,
        };

        set((state) => ({
          recipients: [...state.recipients, newRecipient],
        }));

        return newRecipient.id;
      },

      removeRecipient: (id: string) => {
        set((state) => ({
          recipients: state.recipients.filter((r) => r.id !== id),
        }));
      },

      updateRecipient: (id: string, updates: Partial<Recipient>) => {
        set((state) => ({
          recipients: state.recipients.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        }));
      },

      getRecipientById: (id: string) => {
        return get().recipients.find((r) => r.id === id);
      },

      getRecentRecipients: (limit = 10) => {
        return get()
          .recipients.filter((r) => r.lastTransactionDate)
          .sort((a, b) => {
            const dateA = new Date(a.lastTransactionDate!).getTime();
            const dateB = new Date(b.lastTransactionDate!).getTime();
            return dateB - dateA;
          })
          .slice(0, limit);
      },

      getFavoriteRecipients: () => {
        return get().recipients.filter((r) => r.isFavorite);
      },

      toggleFavorite: (id: string) => {
        set((state) => ({
          recipients: state.recipients.map((r) =>
            r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
          ),
        }));
      },

      incrementTransactionCount: (id: string) => {
        set((state) => ({
          recipients: state.recipients.map((r) =>
            r.id === id
              ? {
                  ...r,
                  totalTransactions: r.totalTransactions + 1,
                  lastTransactionDate: new Date().toISOString(),
                }
              : r
          ),
        }));
      },

      searchRecipients: (query: string) => {
        const lowerQuery = query.toLowerCase();
        return get().recipients.filter(
          (r) =>
            r.name.toLowerCase().includes(lowerQuery) ||
            r.email.toLowerCase().includes(lowerQuery)
        );
      },
    }),
    {
      name: "recipient-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
