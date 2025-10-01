import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: true,
          contentStyle: { backgroundColor },
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
            title: "Send Money",
            presentation: "modal",
            headerShown: false,
          }}
        />

        {/* Amount Screen */}
        <Stack.Screen
          name="amount"
          options={{
            title: "Amount",
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
            title: "",
            headerShown: false,
            presentation: "modal",
            gestureEnabled: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
