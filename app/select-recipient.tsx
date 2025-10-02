import { CloseButton } from "@/components/close-button";
import { RecipientItem } from "@/components/recipient-item";
import { TransactionItem } from "@/components/txn-item";
import { theme } from "@/constants/theme";
import { Transaction, useAccountStore } from "@/stores/useAccountStore";
import { useRecipientStore } from "@/stores/useRecipientStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type Recipient = {
  id: string;
  initials: string;
  name: string;
  email: string;
  accountType?: string;
};

export default function SelectRecipientScreen() {
  const route = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const recipients = useRecipientStore((state) => state.recipients);
  const searchRecipients = useRecipientStore((state) => state.searchRecipients);

  const getRecentTxns = useAccountStore((state) => state.getRecentTransactions);
  const recentTxns = getRecentTxns(3);

  const filteredRecipients = searchQuery
    ? searchRecipients(searchQuery)
    : recipients;

  const handleSelectRecipient = (recipient: Recipient) => {
    route.push({
      pathname: "/amount",
      params: {
        recipientId: recipient.id,
      },
    });
  };

  const handleQuickResend = (transaction: Transaction) => {
    const recipient = recipients.find(
      (recipient) => recipient.id === transaction.recipientId
    );

    if (recipient) {
      route.push({
        pathname: "/amount",
        params: {
          recipientId: recipient.id,
          prefillAmount: transaction.amount.toString(),
          prefillNote: transaction.note,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CloseButton />

      {/* Recipient Searchbar */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Who are you sending to?</Text>
        <View style={styles.recipientInput}>
          <TextInput
            style={styles.recipientInputText}
            placeholder="Name, email, phone number"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Recipients */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Recipients</Text>
        <FlatList
          data={filteredRecipients}
          renderItem={({ item }) => (
            <RecipientItem item={item} onPress={handleSelectRecipient} />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No recipients found</Text>
            </View>
          }
        />
      </View>

      {/* Recent Transfers */}
      <View style={[styles.section, { flex: 1 }]}>
        <Text style={styles.sectionLabel}>Recent transfers</Text>
        {recentTxns.length > 0 && (
          <ScrollView>
            {recentTxns.slice(0, 3).map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onPress={handleQuickResend}
                showResendIcon={true}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    paddingBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: theme.colorTextPrimary,
  },
  recipientInput: {
    flexDirection: "row",
    borderRadius: 40,
    borderColor: theme.colorPrimary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
  },
  recipientInputText: {
    flex: 1,
    fontSize: 16,
    color: theme.colorTextPrimary,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  emptyText: {
    color: theme.colorTextSecondary,
    fontSize: 16,
  },
});
