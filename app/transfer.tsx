import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function TransferScreen() {
  const route = useRouter();
  return (
    <View>
      <Text>Transfer screen</Text>
      <Pressable onPress={() => route.push("/confirm")}>
        <Text style={{ color: "white" }}>Next</Text>
      </Pressable>
    </View>
  );
}
