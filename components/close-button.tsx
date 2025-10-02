import { theme } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export const CloseButton = () => {
  const route = useRouter();

  return (
    <TouchableOpacity
      style={styles.closeButton}
      activeOpacity={0.8}
      onPress={() => route.back()}
    >
      <Ionicons name="close-circle" size={32} color={theme.colorPrimary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    zIndex: 10,
    top: 16,
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
});
