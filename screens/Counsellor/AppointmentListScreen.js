import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import React from "react";
import TopBar from "../../components/Common/TopBar";
import AppointmentList from "../../components/Counsellor/AppointmentList/AppointmentList";

const AppointmentListScreen = () => {
  return (
    <SafeAreaView>
      <TopBar title="Appointments" isFilterAvailable="true" />
      <AppointmentList />
    </SafeAreaView>
  );
};

export default AppointmentListScreen;
