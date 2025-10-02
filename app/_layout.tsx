import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { theme } from "@/constants/theme";
import { QueryProvider } from "@/providers/QueryProvider";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          contentStyle: { backgroundColor: theme.colorBackground },
        }}
      >
        {/* Home Screen */}
        <Stack.Screen
          name="index"
          options={{ title: "", headerShown: false }}
        />

        {/* Select Recipient Screen */}
        <Stack.Screen
          name="select-recipient"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />

        {/* Amount Screen */}
        <Stack.Screen
          name="amount"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />

        {/* Confirm Screen */}
        <Stack.Screen
          name="confirm"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />

        {/* Success Screen */}
        <Stack.Screen
          name="success"
          options={{
            headerShown: false,
            presentation: "modal",
            gestureEnabled: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </QueryProvider>
  );
}
