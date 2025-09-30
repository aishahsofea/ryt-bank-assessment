import { BalanceCard } from "@/components/balance-card";
import { CloseButton } from "@/components/close-button";
import { RecipientCard } from "@/components/recipient-card";
import { ConfirmBottomButton } from "@/components/ui/confirm-bottom-button";
import { useThemeColor } from "@/hooks/use-theme-color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ConfirmScreen() {
  const color = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");

  const params = useLocalSearchParams();

  const recipientName = params.recipientName || "Unknown Recipient";
  const recipientEmail = params.recipientEmail || "Unknown Email";
  const recipientId = params.recipientId || "Unknown ID";
  const amount = params.amount || "0";
  const note = params.note || "";

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <CloseButton />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color }]}>Review & Confirm</Text>
        <Text style={styles.headerSubtitle}>
          Please check all details before confirming
        </Text>
      </View>

      {/* Amount Display - Hero Section */}
      <View style={[styles.amountHero, { borderColor: primaryColor }]}>
        <Text style={styles.amountLabel}>You're sending</Text>
        <Text style={[styles.amountLarge, { color: primaryColor }]}>
          RM {parseFloat(String(amount)).toFixed(2)}
        </Text>
        {note && (
          <View style={styles.noteDisplay}>
            <Ionicons name="chatbox-outline" size={16} color="#6B7280" />
            <Text style={styles.noteText} numberOfLines={2}>
              {note}
            </Text>
          </View>
        )}
      </View>

      <RecipientCard
        recipientName={String(recipientName)}
        recipientEmail={String(recipientEmail)}
      />

      <BalanceCard />

      <ConfirmBottomButton isProcessing={false} onPressConfirm={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#6B7280",
  },
  amountHero: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 2,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  amountLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
    fontWeight: "500",
  },
  amountLarge: {
    fontSize: 48,
    fontWeight: "700",
    letterSpacing: -1,
  },
  noteDisplay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
    maxWidth: "100%",
  },
  noteText: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
});
