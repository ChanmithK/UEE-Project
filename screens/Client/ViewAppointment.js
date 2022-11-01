import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ViewClientAppointmentSubPage from "./SubScreens/ViewAppointmentSubPage";

const ViewClientAppointment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ViewClientAppointmentSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default ViewClientAppointment;
