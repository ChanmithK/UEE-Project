import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ViewAppointmentSubPage from "./SubScreens/ViewAppointmentSubPage";

const ViewAppointment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ViewAppointmentSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default ViewAppointment;
