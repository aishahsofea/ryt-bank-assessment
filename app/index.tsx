import { StyleSheet, Text, View } from "react-native";

import { QuickActionButton } from "@/components/quick-action-button";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAccountStore } from "@/stores/useAccountStore";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const route = useRouter();

  const color = useThemeColor({}, "text");

  const balance = useAccountStore((state) => state.balance);
  const accountHolderName = useAccountStore((state) => state.accountHolderName);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { color }]}>
          Hi, {accountHolderName}!
        </Text>
      </View>

      <View>
        <Text style={[styles.labelText, { color }]}>Account Balance</Text>
        <Text style={[styles.balanceText, { color }]}>
          RM {balance.toFixed(2)}
        </Text>
      </View>

      <View>
        <Text style={[styles.labelText, { color }]}>Quick Actions:</Text>
        <View style={styles.quickActionsContainer}>
          <QuickActionButton
            label="Send Money"
            onPress={() => route.push("/select-recipient")}
          />
          <QuickActionButton
            label="Pay Bills"
            onPress={() => route.navigate("/")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 16,
  },
  labelText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
  },
  balanceText: {
    fontWeight: "600",
    fontSize: 36,
    marginBottom: 24,
  },
  quickActionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
