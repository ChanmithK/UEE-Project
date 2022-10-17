import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AppointmentListScreen from "./screens/Counsellor/AppointmentListScreen";
import ClientHomeScreen from "./screens/Client/HomeScreen";
import ClientBookedAppointmentsScreen from "./screens/Client/BookedAppointmentsScreen";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };
const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BookedAppointments"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ClientHomeScreen" component={ClientHomeScreen} />
        <Stack.Screen
          name="BookedAppointments"
          component={ClientBookedAppointmentsScreen}
        />
        <Stack.Screen
          name="AppointmentListScreen"
          component={AppointmentListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
