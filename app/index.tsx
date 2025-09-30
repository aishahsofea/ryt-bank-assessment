import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { QuickActionButton } from "@/components/quick-action-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const route = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hi, John!</ThemedText>
      </ThemedView>

      <View>
        <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
          Account Balance
        </ThemedText>
        <ThemedText>RM 1234</ThemedText>
      </View>

      <View>
        <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
          Quick Actions:
        </ThemedText>
        <View style={styles.quickActionsContainer}>
          <QuickActionButton
            label="Send Money"
            onPress={() => route.push("/select-recipient")}
          />
          <QuickActionButton
            label="Pay Bills"
            onPress={() => route.navigate("/")}
          />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  quickActionsContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
