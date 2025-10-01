import { useThemeColor } from "@/hooks/use-theme-color";
import { Transaction } from "@/stores/useAccountStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

type TransactionItemProps = {
  transaction: Transaction;
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const color = useThemeColor({}, "text");

  const isReceived = transaction.type === "received";
  const amount = transaction.amount;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.transactionIcon,
            { backgroundColor: isReceived ? "#D1FAE5" : "#FEE2E2" },
          ]}
        >
          <Ionicons
            name={isReceived ? "arrow-down" : "arrow-up"}
            size={20}
            color={isReceived ? "#059669" : "#DC2626"}
          />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={[styles.transactionName, { color }]} numberOfLines={1}>
            {transaction.recipientName}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(transaction.date)}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          { color: isReceived ? "#059669" : "#DC2626" },
        ]}
      >
        {isReceived ? "+" : "-"}RM {amount.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },
});
