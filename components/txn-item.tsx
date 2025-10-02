import { theme } from "@/constants/theme";
import { Transaction } from "@/stores/useAccountStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

type TransactionItemProps = {
  transaction: Transaction;
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
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
            {
              backgroundColor: isReceived
                ? theme.colorGreenLight
                : theme.colorRedLight,
            },
          ]}
        >
          <Ionicons
            name={isReceived ? "arrow-down" : "arrow-up"}
            size={20}
            color={isReceived ? theme.colorSuccessText : theme.colorErrorText}
          />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName} numberOfLines={1}>
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
          { color: isReceived ? theme.colorSuccessText : theme.colorErrorText },
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
    borderBottomColor: theme.colorGrey,
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
    color: theme.colorTextPrimary,
  },
  transactionDate: {
    fontSize: 13,
    color: theme.colorTextSecondary,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },
});
