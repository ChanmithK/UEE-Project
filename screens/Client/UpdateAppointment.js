import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import UpdateAppointmentSubPage from "./SubScreens/UpdateAppointmentSubPage";

const UpdateAppointment = ({ navigation, route }) => {
  const id = route.params.id;
  const data = route.params.data;

  return (
    <SafeAreaView style={styles.container}>
      <UpdateAppointmentSubPage id={id} data={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default UpdateAppointment;
