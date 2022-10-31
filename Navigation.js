import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AppointmentListScreen from "./screens/Counsellor/AppointmentListScreen";
import ClientHomeScreen from "./screens/Client/HomeScreen";
import ClientBookedAppointmentsScreen from "./screens/Client/BookedAppointmentsScreen";
import ViewAppointment from "./screens/Counsellor/ViewAppointmentMainPage";
import CounsellorProfile from "./screens/Counsellor/CounsellorProfile";
import CounsellorProfileUpdate from "./screens/Counsellor/CounsellorProfileUpdate";
import MakeAppointment from "./screens/Client/MakeAppointment";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };
const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AppointmentListScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        {/* Client Screens */}
        <Stack.Screen name="ClientHomeScreen" component={ClientHomeScreen} />
        <Stack.Screen
          name="BookedAppointmentsScreen"
          component={ClientBookedAppointmentsScreen}
        />
        <Stack.Screen name="MakeAppointment" component={MakeAppointment} />

        {/* Counsellor Screens */}
        <Stack.Screen
          name="AppointmentListScreen"
          component={AppointmentListScreen}
        />
        <Stack.Screen
          name="ViewAppointmentScreen"
          component={ViewAppointment}
        />
        <Stack.Screen
          name="CounsellorProfileScreen"
          component={CounsellorProfile}
        />
        <Stack.Screen
          name="CounsellorProfileUpdateScreen"
          component={CounsellorProfileUpdate}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
