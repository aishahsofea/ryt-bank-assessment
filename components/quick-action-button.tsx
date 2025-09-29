import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type QuickActionButtonProps = {
  label: string;
};

export const QuickActionButton = ({ label }: QuickActionButtonProps) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: primaryColor }}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
  },
  label: { fontSize: 16, fontWeight: "600", color: "#fff" },
});
