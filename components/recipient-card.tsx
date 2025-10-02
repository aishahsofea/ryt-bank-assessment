import { theme } from "@/constants/theme";
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
  const route = useRouter();

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Recipient</Text>
        <TouchableOpacity onPress={() => route.back()}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recipientInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {String(recipientName)
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Text>
        </View>
        <View style={styles.recipientDetails}>
          <Text style={styles.recipientName}>{recipientName}</Text>
          {recipientEmail && (
            <Text style={styles.recipientEmail}>{recipientEmail}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colorTextPrimary,
    borderColor: theme.colorPrimary,
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
    color: theme.colorTextSecondary,
  },
  editButton: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colorPrimary,
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
    backgroundColor: theme.colorPrimary,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colorTextPrimary,
  },
  recipientDetails: {
    flex: 1,
  },
  recipientName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: theme.colorPrimary,
  },
  recipientEmail: {
    fontSize: 14,
    color: theme.colorTextSecondary,
  },
});
