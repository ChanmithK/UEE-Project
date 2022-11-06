import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ViewClientAppointmentSubPage from "./SubScreens/ViewAppointmentSubPage";

const ViewClientAppointment = ({ navigation, route }) => {
  const id = route.params.id;

  return (
    <SafeAreaView style={styles.container}>
      <ViewClientAppointmentSubPage id={id} />
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
