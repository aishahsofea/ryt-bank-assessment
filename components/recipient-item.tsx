import { Recipient } from "@/app/select-recipient";
import { theme } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RecipientItemProps = {
  item: Recipient;
  onPress?: (item: Recipient) => void;
};

export const RecipientItem = ({ item, onPress }: RecipientItemProps) => {
  return (
    <TouchableOpacity
      style={styles.recipientItem}
      activeOpacity={0.7}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(item);
      }}
    >
      <View style={styles.recipientInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>
        <View style={styles.recipientDetails}>
          <Text style={styles.recipientName}>{item.name}</Text>
          <Text style={styles.recipientAccount}>{item.accountType}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colorPrimary} />
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
    backgroundColor: theme.colorPrimary,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colorTextPrimary,
  },
  recipientDetails: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: theme.colorTextPrimary,
  },
  recipientAccount: {
    fontSize: 14,
    color: theme.colorTextSecondary,
  },
});
