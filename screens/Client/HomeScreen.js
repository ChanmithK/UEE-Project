import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { StyleSheet, View } from "react-native";
import Home from "../../components/Client/Home";
import BottomTabs, { bottomTabIcons } from "../../components/Common/BottomTabs";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Home />
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
  },
});
export default HomeScreen;
