import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CounsellorProfileUpdateSubPage from "./SubScreens/CounsellorProfileUpdateSubPage";

const CounsellorProfileUpdate = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CounsellorProfileUpdateSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default CounsellorProfileUpdate;
