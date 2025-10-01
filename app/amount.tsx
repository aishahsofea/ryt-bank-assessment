import { CloseButton } from "@/components/close-button";
import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAccountStore } from "@/stores/useAccountStore";
import { useRecipientStore } from "@/stores/useRecipientStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AmountScreen() {
  const color = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");
  const iconColor = useThemeColor({}, "icon");

  const route = useRouter();
  const params = useLocalSearchParams();

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const recipientId = params.recipientId || "Unknown ID";

  const availableBalance = useAccountStore((state) => state.balance);
  const getRecipientById = useRecipientStore((state) => state.getRecipientById);

  const recipient = getRecipientById(recipientId as string);
  const recipientName = recipient?.name || "Unknown";

  const formatAmount = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      return parts[0] + "." + parts.slice(1).join("");
    }
    if (parts[1]?.length > 2) {
      return parts[0] + "." + parts[1].slice(0, 2);
    }
    return cleaned;
  };

  const handleAmountChange = (value: string) => {
    setAmount(formatAmount(value));
  };

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount.");
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      Alert.alert(
        "Insufficient Balance",
        "You do not have enough balance for this transfer."
      );
      return;
    }

    route.push({
      pathname: "/confirm",
      params: {
        recipientId,
        amount,
        note,
      },
    });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ marginBottom: 100 }}
      keyboardShouldPersistTaps="handled"
    >
      <CloseButton />

      {/* Recipient Info */}
      <View style={[styles.recipientBar, { backgroundColor: primaryColor }]}>
        <View style={styles.recipientInfo}>
          <Text style={[styles.sendingToLabel, { color }]}>Sending to</Text>
          <Text style={[styles.recipientName, { color }]}>{recipientName}</Text>
        </View>
        <TouchableOpacity onPress={() => route.back()}>
          <Text style={[styles.changeButton, { color }]}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Amount Input Section */}
      <View style={styles.amountSection}>
        <Text style={styles.amountLabel}>Amount</Text>
        <View style={styles.amountInputContainer}>
          <Text style={[styles.currency, { color }]}>RM</Text>
          <TextInput
            style={[styles.amountInput, { color }]}
            placeholder="0.00"
            placeholderTextColor="#D1D5DB"
            keyboardType="decimal-pad"
            returnKeyType="done"
            value={amount}
            onChangeText={handleAmountChange}
            maxLength={10}
            autoFocus={true}
          />
        </View>
      </View>

      {/* Balance Display */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceRow}>
          <Ionicons name="wallet-outline" size={20} color="#10B981" />
          <Text style={styles.balanceLabel}>Available Balance</Text>
        </View>
        <Text style={styles.balanceAmount}>
          RM {availableBalance.toFixed(2)}
        </Text>
      </View>

      <View style={styles.noteSection}>
        <Text style={[styles.noteLabel, { color }]}>
          What's this for?{" "}
          <Text style={[styles.optional, { color: iconColor }]}>
            (optional)
          </Text>
        </Text>
        <View
          style={[
            styles.noteInputContainer,
            { borderColor: note ? primaryColor : "#E5E7EB" },
          ]}
        >
          <TextInput
            style={[styles.noteInput, { color }]}
            placeholder="Add a note or message"
            placeholderTextColor="#9CA3AF"
            value={note}
            onChangeText={setNote}
            multiline
            maxLength={100}
            textAlignVertical="top"
          />
        </View>
        <Text style={[styles.characterCount, { color: iconColor }]}>
          {note.length}/100
        </Text>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: primaryColor },
            (!amount || parseFloat(amount) <= 0) &&
              styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!amount || parseFloat(amount) <= 0}
          activeOpacity={0.8}
        >
          <Text style={[styles.continueButtonText, { color }]}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color={color} />
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recipientBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderRadius: 12,
  },
  recipientInfo: {
    flex: 1,
  },
  sendingToLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "600",
  },
  recipientName: {
    fontSize: 24,
    fontWeight: "600",
  },
  changeButton: {
    fontSize: 14,
    fontWeight: "600",
  },
  amountSection: {
    paddingTop: 40,
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colorPrimary,
    marginBottom: 16,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: theme.colorPrimary,
    paddingBottom: 8,
  },
  currency: {
    fontSize: 48,
    fontWeight: "700",
    marginRight: 12,
  },
  amountInput: {
    flex: 1,
    fontSize: 48,
    fontWeight: "700",
    padding: 0,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    padding: 20,
    backgroundColor: theme.colorGreenLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colorGreen,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: theme.colorGreen,
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colorGreen,
  },
  noteSection: {
    marginTop: 32,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  optional: {
    fontWeight: "400",
  },
  noteInputContainer: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
  },
  noteInput: {
    fontSize: 16,
    minHeight: 80,
    padding: 0,
  },
  characterCount: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "right",
  },
  buttonContainer: {
    paddingVertical: 24,
  },
  continueButton: {
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  continueButtonDisabled: {
    backgroundColor: theme.colorDisabledGrey,
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: "600",
  },
});
