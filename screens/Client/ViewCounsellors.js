import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ViewCounsellorsSubPage from "./SubScreens/ViewCounsellorsSubPage";

const ViewCounsellors = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ViewCounsellorsSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default ViewCounsellors;
