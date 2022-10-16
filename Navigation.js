import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AppointmentListScreen from "./screens/Counsellor/AppointmentListScreen";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };
const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="AppointmentListScreen"
          component={AppointmentListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
