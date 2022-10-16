import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import React from "react";
import TopBar from "../../components/Common/TopBar";

const AppointmentListScreen = () => {
  return (
    <SafeAreaView>
      <TopBar title="Appointments" isFilterAvailable="true" />
    </SafeAreaView>
  );
};

export default AppointmentListScreen;
