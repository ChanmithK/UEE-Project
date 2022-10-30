import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AppointmentListScreen from "./screens/Counsellor/AppointmentListScreen";
import ClientHomeScreen from "./screens/Client/HomeScreen";
import ClientBookedAppointmentsScreen from "./screens/Client/BookedAppointmentsScreen";
import ViewAppointment from "./screens/Counsellor/ViewAppointmentMainPage";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };
const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ViewAppointmentScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        {/* Client Screens */}
        <Stack.Screen name="ClientHomeScreen" component={ClientHomeScreen} />
        <Stack.Screen
          name="BookedAppointments"
          component={ClientBookedAppointmentsScreen}
        />

        {/* Counsellor Screens */}
        <Stack.Screen
          name="AppointmentListScreen"
          component={AppointmentListScreen}
        />
        <Stack.Screen
          name="ViewAppointmentScreen"
          component={ViewAppointment}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
