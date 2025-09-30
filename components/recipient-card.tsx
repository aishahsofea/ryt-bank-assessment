import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RecipientCardProps = {
  recipientName: string;
  recipientEmail?: string;
};

export const RecipientCard = ({
  recipientName,
  recipientEmail,
}: RecipientCardProps) => {
  const color = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");
  const secondaryTextColor = useThemeColor({}, "secondaryText");

  const route = useRouter();

  return (
    <View style={[styles.card, { borderColor: primaryColor }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: secondaryTextColor }]}>
          Recipient
        </Text>
        <TouchableOpacity onPress={() => route.back()}>
          <Text style={[styles.editButton, { color: primaryColor }]}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recipientInfo}>
        <View style={[styles.avatar, { backgroundColor: primaryColor }]}>
          <Text style={styles.avatarText}>
            {String(recipientName)
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Text>
        </View>
        <View style={styles.recipientDetails}>
          <Text style={[styles.recipientName, { color: primaryColor }]}>
            {recipientName}
          </Text>
          {recipientEmail && (
            <Text
              style={[styles.recipientEmail, { color: secondaryTextColor }]}
            >
              {recipientEmail}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 2,
    padding: 20,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  editButton: {
    fontSize: 14,
    fontWeight: "600",
  },
  recipientInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  recipientDetails: {
    flex: 1,
  },
  recipientName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  recipientEmail: {
    fontSize: 14,
  },
});
