import { theme } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ConfirmBottomButtonProps = {
  isProcessing: boolean;
  onPressConfirm: () => void;
};

export const ConfirmBottomButton = ({
  isProcessing,
  onPressConfirm,
}: ConfirmBottomButtonProps) => {
  const route = useRouter();

  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        style={[
          styles.confirmButton,
          isProcessing && styles.confirmButtonDisabled,
        ]}
        onPress={onPressConfirm}
        disabled={isProcessing}
        activeOpacity={0.8}
      >
        {isProcessing ? (
          <>
            <Text style={styles.confirmButtonText}>Processing...</Text>
          </>
        ) : (
          <>
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color="#FFFFFF"
            />
            <Text style={styles.confirmButtonText}>Confirm & Pay</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => route.back()}
        disabled={isProcessing}
        activeOpacity={0.7}
      >
        <Text style={styles.cancelButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colorTextPrimary,
    shadowColor: theme.colorBackground,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  confirmButton: {
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 12,
    backgroundColor: theme.colorPrimary,
    shadowColor: theme.colorPrimaryShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  cancelButton: {
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B7280",
  },
});
