import { CloseButton } from "@/components/close-button";
import { RecipientItem } from "@/components/recipient-item";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export type Recipient = {
  id: string;
  initials: string;
  name: string;
  email: string;
  accountType?: string;
};

const RECENT_RECIPIENTS: Recipient[] = [
  {
    id: "1",
    name: "Sarah Chen",
    initials: "SC",
    email: "sarah.chen@email.com",
    accountType: "Bank account ending in 1234",
  },
  {
    id: "2",
    name: "Mike Johnson",
    initials: "MJ",
    email: "mike.j@email.com",
    accountType: "Bank account ending in 5678",
  },
  {
    id: "3",
    name: "Emily Davis",
    initials: "ED",
    email: "emily.d@email.com",
    accountType: "Bank account ending in 9012",
  },
  {
    id: "4",
    name: "James Wilson",
    initials: "JW",
    email: "james.w@email.com",
    accountType: "Bank account ending in 3456",
  },
];

export default function SelectRecipientScreen() {
  const route = useRouter();
  const primaryColor = useThemeColor({}, "primary");
  const color = useThemeColor({}, "text");

  const [searchQuery, setSearchQuery] = useState("");
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleContinue = () => {
    if (!recipient) {
      Alert.alert("Please select a recipient.");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Please enter a valid amount.");
      return;
    }

    route.push({
      pathname: "/confirm",
      params: {
        recipientName: recipient.name,
        recipientEmail: recipient.email,
        amount,
        note,
      },
    });
  };

  const handleSelectRecipient = (recipient: Recipient) => {
    setRecipient(recipient);
    route.push({
      pathname: "/amount",
      params: {
        recipientId: recipient.id,
        recipientName: recipient.name,
        recipientEmail: recipient.email,
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
        data={RECENT_RECIPIENTS}
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
