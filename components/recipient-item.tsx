import { Recipient } from "@/app/select-recipient";
import { useThemeColor } from "@/hooks/use-theme-color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RecipientItemProps = {
  item: Recipient;
  onPress?: (item: Recipient) => void;
};

export const RecipientItem = ({ item, onPress }: RecipientItemProps) => {
  const primaryColor = useThemeColor({}, "primary");
  const color = useThemeColor({}, "text");

  return (
    <TouchableOpacity
      style={styles.recipientItem}
      activeOpacity={0.7}
      onPress={() => onPress?.(item)}
    >
      <View style={styles.recipientInfo}>
        <View style={[styles.avatar, { backgroundColor: primaryColor }]}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>
        <View style={styles.recipientDetails}>
          <Text style={[styles.recipientName, { color }]}>{item.name}</Text>
          <Text style={styles.recipientAccount}>{item.accountType}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipientItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  recipientInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  recipientDetails: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  recipientAccount: {
    fontSize: 14,
    color: "#6B7280",
  },
});
