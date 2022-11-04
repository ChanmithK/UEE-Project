import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AppointmentList from "../../components/Counsellor/AppointmentList/AppointmentList";

const AppointmentListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppointmentList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default AppointmentListScreen;
