import { useThemeColor } from "@/hooks/use-theme-color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type BalanceCardProps = {
  balance: number;
};

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  const primaryColor = useThemeColor({}, "primary");
  const color = useThemeColor({}, "text");

  return (
    <View style={[styles.balanceCard, { backgroundColor: primaryColor }]}>
      <Text style={[styles.balanceLabel, { color }]}>Account Balance</Text>
      <Text style={[styles.balanceAmount, { color }]}>
        RM {balance.toFixed(2)}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.cardInfo}>
          <Ionicons name="card-outline" size={16} color={color} />
          <Text style={[styles.cardInfoText, { color }]}>**** 7890</Text>
        </View>
        <TouchableOpacity style={styles.eyeButton}>
          <Ionicons name="eye-outline" size={18} color={color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  balanceLabel: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: -1,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardInfoText: {
    fontSize: 14,
    fontWeight: "500",
  },
  eyeButton: {
    padding: 4,
  },
});
