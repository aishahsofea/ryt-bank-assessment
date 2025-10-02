import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { BalanceCard } from "@/components/balance-card";
import { GreetingHeader } from "@/components/greeting-header";
import { QuickActionButton } from "@/components/quick-action-button";
import { TransactionItem } from "@/components/txn-item";
import { theme } from "@/constants/theme";
import { useAccountStore } from "@/stores/useAccountStore";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const route = useRouter();

  const balance = useAccountStore((state) => state.balance);
  const getRecentTxns = useAccountStore((state) => state.getRecentTransactions);

  const recentTxns = getRecentTxns(10);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <GreetingHeader />

      <BalanceCard balance={balance} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          What would you like to do today?
        </Text>
        <View style={styles.quickActionsContainer}>
          <QuickActionButton
            label="Send Money"
            icon="send"
            onPress={() => route.push("/select-recipient")}
          />
          <QuickActionButton
            label="Pay Bills"
            icon="cash"
            onPress={() => route.navigate("/")}
          />
        </View>
      </View>

      <View style={[styles.section, { flex: 1 }]}>
        <View style={styles.transactionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentTxns.length > 0 && (
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          )}
        </View>

        {recentTxns.length > 0 && (
          <FlatList
            data={recentTxns}
            renderItem={({ item }) => <TransactionItem transaction={item} />}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 30,
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
  section: {
    marginBottom: 24,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colorTextPrimary,
  },
  seeAllButton: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colorPrimary,
  },
  balanceText: {
    fontWeight: "600",
    fontSize: 36,
    marginBottom: 24,
  },
  quickActionsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
});
