import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ViewCounsellorSubPage from "./SubScreens/ViewCounsellorSubPage";

const ViewCounsellor = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ViewCounsellorSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default ViewCounsellor;
