import { CloseButton } from "@/components/close-button";
import { RecipientItem } from "@/components/recipient-item";
import { theme } from "@/constants/theme";
import { useRecipientStore } from "@/stores/useRecipientStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

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

  return (
    <View style={styles.container}>
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

      <View></View>

      <FlatList
        contentContainerStyle={styles.recipientsContainer}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  section: {
    paddingVertical: 16,
  },
  sectionLabel: {
    fontSize: 24,
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
  recipientsContainer: {
    marginTop: 32,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 48,
  },
  emptyText: {
    color: theme.colorTextSecondary,
    fontSize: 16,
  },
});
