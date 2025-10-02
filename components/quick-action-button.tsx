import { theme } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type QuickActionButtonProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export const QuickActionButton = ({
  label,
  icon,
  onPress,
}: QuickActionButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
      }}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={theme.colorTextPrimary} />
        <Text style={styles.label} numberOfLines={2}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "flex-start",
    gap: 8,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorPrimary,
    shadowColor: theme.colorBackground,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: theme.colorTextPrimary,
  },
});
