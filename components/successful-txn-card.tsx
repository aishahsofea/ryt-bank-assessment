import { theme } from "@/constants/theme";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

type SuccessfulTxnCardProps = {
  amount: number;
  date: Date;
  recipientName: string;
  transactionId: string;
};

export const SuccessfulTxnCard = ({
  amount,
  date,
  recipientName,
  transactionId,
}: SuccessfulTxnCardProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Animated.View
      style={[
        styles.detailsCard,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      {/* Amount */}
      <View style={styles.amountSection}>
        <Text style={styles.amountLabel}>Amount Sent</Text>
        <Text style={[styles.amount, { color: "#10B981" }]}>
          RM {amount.toFixed(2)}
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Recipient */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>To</Text>
        <Text style={styles.detailValue}>{recipientName}</Text>
      </View>

      {/* Transaction ID */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Transaction ID</Text>
        <Text
          style={[
            styles.detailValue,
            styles.transactionId,
            { color: theme.colorTextSecondary },
          ]}
        >
          {transactionId}
        </Text>
      </View>

      {/* Date */}
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date & Time</Text>
        <Text style={styles.detailValue}>{formatDate(date)}</Text>
      </View>

      {/* Status Badge */}
      <View style={styles.statusBadge}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Completed</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  detailsCard: {
    backgroundColor: theme.colorTextPrimary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: theme.colorGrey,
  },
  amountSection: {
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 14,
    color: theme.colorTextSecondary,
    marginBottom: 8,
    fontWeight: "500",
  },
  amount: {
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: -1,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colorGrey,
    marginVertical: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: theme.colorTextSecondary,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
    color: theme.colorTextSecondary,
  },
  transactionId: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colorTextPrimary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 12,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colorSuccessBackground,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colorSuccessText,
  },
});
