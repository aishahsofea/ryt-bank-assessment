import { theme } from "@/constants/theme";
import { useAccountStore } from "@/stores/useAccountStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

type BalanceCardProps = {
  transferAmount: number;
};

export const BalanceComparisonCard = ({ transferAmount }: BalanceCardProps) => {
  const availableBalance = useAccountStore((state) => state.balance);
  const newBalance = availableBalance - (transferAmount || 0);

  return (
    <View style={styles.balanceCard}>
      <View style={styles.balanceComparison}>
        <View>
          <Text style={styles.balanceLabel}>Current balance</Text>
          <Text style={styles.balanceAmount}>
            RM {availableBalance.toFixed(2)}
          </Text>
        </View>

        <Ionicons name="arrow-forward" size={24} color={theme.colorPrimary} />

        <View>
          <Text style={styles.balanceLabel}>After transfer</Text>
          <Text style={styles.balanceAmount}>RM {newBalance.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    backgroundColor: theme.colorTextPrimary,
  },
  balanceComparison: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 12,
    color: theme.colorTextSecondary,
    marginBottom: 6,
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colorPrimary,
  },
});
