import { CloseButton } from "@/components/close-button";
import { RecipientItem } from "@/components/recipient-item";
import { useThemeColor } from "@/hooks/use-theme-color";
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
  const primaryColor = useThemeColor({}, "primary");
  const color = useThemeColor({}, "text");

  const [searchQuery, setSearchQuery] = useState("");
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const recipients = useRecipientStore((state) => state.recipients);
  const searchRecipients = useRecipientStore((state) => state.searchRecipients);

  const filteredRecipients = searchQuery
    ? searchRecipients(searchQuery)
    : recipients;

  const handleSelectRecipient = (recipient: Recipient) => {
    setRecipient(recipient);
    route.push({
      pathname: "/amount",
      params: {
        recipientId: recipient.id,
      },
    });
  };

  return (
    <View
      style={styles.container}
      // contentContainerStyle={styles.scrollContent}
      // keyboardShouldPersistTaps="handled"
    >
      <CloseButton />

      {/* Recipient Searchbar */}
      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color }]}>
          Who are you sending to?
        </Text>
        <View style={[styles.recipientInput, { borderColor: primaryColor }]}>
          <TextInput
            style={[styles.recipientInputText, { color }]}
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
          <View>
            <Text>No recipients in the list</Text>
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
  },
  recipientInput: {
    flexDirection: "row",
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
  },
  recipientInputText: {
    flex: 1,
    fontSize: 16,
  },
  recipientsContainer: {
    marginTop: 32,
  },
});
