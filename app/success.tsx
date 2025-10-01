import { SuccessfulTxnCard } from "@/components/successful-txn-card";
import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SuccessScreen() {
  const color = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");
  const primaryShadowColor = useThemeColor({}, "primaryShadow");

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const params = useLocalSearchParams();

  const recipientName = String(params.recipientName) || "Unknown Recipient";
  const amount = Number(params.amount || "0");
  const txnId = String(params.txnId) || "Unknown Transaction ID";
  const date = params.date ? new Date(String(params.date)) : new Date();

  const route = useRouter();

  const handleDone = () => {
    route.dismissAll();
    route.replace("/");
  };

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View
            style={[styles.iconCircle, { backgroundColor: theme.colorSuccess }]}
          >
            <Ionicons name="checkmark" size={76} color={color} />
          </View>
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.messageContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={[styles.title, { color }]}>Transfer Successful!</Text>
        <Text style={styles.subtitle}>Your money is on its way</Text>
      </Animated.View>

      <SuccessfulTxnCard
        amount={amount}
        date={date}
        recipientName={recipientName}
        transactionId={txnId}
      />

      <TouchableOpacity
        style={[
          styles.doneButton,
          { backgroundColor: primaryColor, shadowColor: primaryShadowColor },
        ]}
        onPress={handleDone}
        activeOpacity={0.8}
      >
        <Text style={[styles.doneButtonText, { color }]}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  messageContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  doneButton: {
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  doneButtonText: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
