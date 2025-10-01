import { useThemeColor } from "@/hooks/use-theme-color";
import { useAccountStore } from "@/stores/useAccountStore";
import { StyleSheet, Text, View } from "react-native";

export const GreetingHeader = () => {
  const color = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");

  const accountHolderName = useAccountStore((state) => state.accountHolderName);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Good {getGreeting()}</Text>
        <Text style={[styles.userName, { color }]}>{accountHolderName}</Text>
      </View>
      <View style={[styles.profileIcon, { backgroundColor: primaryColor }]}>
        <Text style={styles.profileInitial}>
          {accountHolderName.charAt(0).toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 4,
  },
  userName: {
    fontSize: 36,
    fontWeight: "700",
  },
  profileIcon: {
    padding: 4,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
