import { useThemeColor } from "@/hooks/use-theme-color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export const BalanceCard = () => {
  const color = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");
  const secondaryTextColor = useThemeColor({}, "secondaryText");

  const availableBalance = 1234; // TODO: get from global state or API
  const newBalance = availableBalance - 100; // Example deduction, replace with actual amount

  return (
    <View style={[styles.balanceCard, { backgroundColor: color }]}>
      <View style={styles.balanceComparison}>
        <View>
          <Text style={[styles.balanceLabel, { color: secondaryTextColor }]}>
            Current balance
          </Text>
          <Text style={[styles.balanceAmount, { color: primaryColor }]}>
            RM {availableBalance.toFixed(2)}
          </Text>
        </View>

        <Ionicons name="arrow-forward" size={24} color={primaryColor} />

        <View>
          <Text style={[styles.balanceLabel, { color: secondaryTextColor }]}>
            After transfer
          </Text>
          <Text style={[styles.balanceAmount, { color: primaryColor }]}>
            RM {newBalance.toFixed(2)}
          </Text>
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
  },
  balanceComparison: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "700",
  },
});
