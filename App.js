import { View, Text } from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Universal React with Expo</Text>
    </View>
  );
}

//generate random 2 numbers function
function generateRandomNumbers() {
  return [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
}
