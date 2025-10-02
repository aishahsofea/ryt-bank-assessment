import { theme } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type BalanceCardProps = {
  balance: number;
};

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  return (
    <View style={[styles.balanceCard]}>
      <Text style={styles.balanceLabel}>Account Balance</Text>
      <Text style={styles.balanceAmount}>RM {balance.toFixed(2)}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.cardInfo}>
          <Ionicons
            name="card-outline"
            size={16}
            color={theme.colorTextPrimary}
          />
          <Text style={styles.cardInfoText}>**** 7890</Text>
        </View>
        <TouchableOpacity style={styles.eyeButton}>
          <Ionicons
            name="eye-outline"
            size={18}
            color={theme.colorTextPrimary}
          />
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
    backgroundColor: theme.colorPrimary,
    shadowColor: theme.colorPrimaryShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  balanceLabel: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "500",
    color: theme.colorTextPrimary,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: -1,
    marginBottom: 10,
    color: theme.colorTextPrimary,
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
    color: theme.colorTextPrimary,
  },
  eyeButton: {
    padding: 4,
  },
});
