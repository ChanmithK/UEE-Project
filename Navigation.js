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
import ViewCounsellor from "./screens/Client/ViewCounsellor";
import ViewArticles from "./screens/Client/ViewArticles";
import ViewArticle from "./screens/Client/ViewArticle";
import ViewClientAppointment from "./screens/Client/ViewAppointment";
import ViewCounsellors from "./screens/Client/ViewCounsellors";
import ViewMentors from "./screens/Client/ViewMentors";
import CreateArticle from "./screens/Mentor/CreateArticle";
import ViewCreatedArticles from "./screens/Mentor/ViewCreatedArticles";
import ViewCreatedArticle from "./screens/Mentor/ViewCreatedArticle";
import UpdateArticle from "./screens/Mentor/UpdateArticle";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };
const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UpdateArticleScreen"
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
        <Stack.Screen
          name="MakeAppointmentScreen"
          component={MakeAppointment}
        />
        <Stack.Screen name="ViewCounsellorScreen" component={ViewCounsellor} />
        <Stack.Screen
          name="ViewCounsellorsScreen"
          component={ViewCounsellors}
        />
        <Stack.Screen name="ViewMentorsScreen" component={ViewMentors} />
        <Stack.Screen name="ViewArticlesScreen" component={ViewArticles} />
        <Stack.Screen name="ViewArticleScreen" component={ViewArticle} />
        <Stack.Screen
          name="ViewClientAppointmentScreen"
          component={ViewClientAppointment}
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
        <Stack.Screen
          name="CounsellorProfileScreen"
          component={CounsellorProfile}
        />
        <Stack.Screen
          name="CounsellorProfileUpdateScreen"
          component={CounsellorProfileUpdate}
        />

        {/* Mentor */}
        <Stack.Screen name="CreateArticleScreen" component={CreateArticle} />
        <Stack.Screen
          name="ViewCreatedArticlesScreen"
          component={ViewCreatedArticles}
        />
        <Stack.Screen
          name="ViewCreatedArticleScreen"
          component={ViewCreatedArticle}
        />
        <Stack.Screen name="UpdateArticleScreen" component={UpdateArticle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
