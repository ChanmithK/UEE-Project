import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MakeAppointmentSubPage from "./SubScreens/MakeAppointmentSubPage";

const MakeAppointment = ({ navigation, route }) => {
  const id = route.params.id;
  const name = route.params.name;
  const role = route.params.role;
  const image = route.params.image;

  return (
    <SafeAreaView style={styles.container}>
      <MakeAppointmentSubPage id={id} name={name} role={role} image={image} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default MakeAppointment;
