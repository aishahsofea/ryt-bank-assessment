import { useThemeColor } from "@/hooks/use-theme-color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function TransferScreen() {
  const route = useRouter();
  const primaryColor = useThemeColor({}, "primary");
  const color = useThemeColor({}, "text");

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.closeButton}
        activeOpacity={0.8}
        onPress={() => route.back()}
      >
        <Ionicons name="close-circle" size={32} color={primaryColor} />
      </TouchableOpacity>

      {/* Recipient Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color }]}>Select Recipient</Text>
        <View style={[styles.recipientInput, { borderColor: primaryColor }]}>
          <TextInput
            placeholder="Search or select a recipient"
            style={[styles.recipientInputText, { color }]}
          />
        </View>
      </View>

      {/* Amount Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color }]}>Enter Amount</Text>
        <View style={[styles.recipientInput, { borderColor: primaryColor }]}>
          <TextInput
            placeholder="0.00"
            keyboardType="decimal-pad"
            style={[styles.recipientInputText, { color }]}
          />
        </View>

        <View style={styles.balanceRow}>
          <Text style={[styles.balanceLabel, { color }]}>
            Available Balance
          </Text>
          <Text style={[styles.balanceAmount, { color }]}>RM 1234.00</Text>
        </View>
      </View>

      {/* Note Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color }]}>
          Add a Note (Optional)
        </Text>
        <View style={[styles.recipientInput, { borderColor: primaryColor }]}>
          <TextInput
            style={[styles.recipientInputText, styles.noteInput, { color }]}
            placeholder="What's this for?"
            maxLength={150}
            multiline
          />
        </View>
        <Text style={[styles.characterCount, { color }]}>0/100</Text>
      </View>

      <View style={{ height: 60 }} />

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.continueButton}>
          <Text
            style={{
              color,
              fontSize: 16,
              fontWeight: "600",
              letterSpacing: 1,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    // paddingTop: 20,
    // paddingBottom: 100,
  },
  closeButton: {
    zIndex: 10,
    top: 16,
    left: 16,
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 32,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  recipientInput: {
    flexDirection: "row",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
  },
  recipientInputText: {
    flex: 1,
    fontSize: 16,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    alignItems: "center",
    paddingBottom: 40,
  },
  balanceLabel: {
    fontSize: 20,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "600",
  },
  characterCount: {
    textAlign: "right",
    marginTop: 4,
  },
  noteInput: {
    minHeight: 120,
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 46,
  },
  continueButton: {
    backgroundColor: "blue",
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
