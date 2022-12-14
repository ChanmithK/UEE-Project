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
import UpdateAppointment from "./screens/Client/UpdateAppointment";
import InitialPage from "./screens/Common/InitialPage";
import RegisterScreenUser from "./screens/RegisterScreenUser";
import RegisterCounsellor from "./screens/RegisterCounsellor";
import RegisterMentor from "./screens/RegisterMentor";
import MenuScreen from "./components/Client/Menu";
import CounsellorMenu from "./components/Counsellor/CounsellorMenu";
import AppointmentHistoryList from "./screens/Counsellor/AppointmentHistoryList";

const Stack = createStackNavigator();
const screenOptions = { headerShown: false };
const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="InitialPageScreen" component={InitialPage} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="RegisterScreenUser"
          component={RegisterScreenUser}
        />
        <Stack.Screen
          name="RegisterScreenCounsellor"
          component={RegisterCounsellor}
        />
        <Stack.Screen name="RegisterScreenMentor" component={RegisterMentor} />

        {/* Client Screens */}
        <Stack.Screen name="ClientHomeScreen" component={ClientHomeScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
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
        <Stack.Screen
          name="UpdateAppointmentScreen"
          component={UpdateAppointment}
        />

        {/* Counsellor Screens */}
        <Stack.Screen
          name="AppointmentListScreen"
          component={AppointmentListScreen}
        />
        <Stack.Screen
          name="AppointmentHistoryListScreen"
          component={AppointmentHistoryList}
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
        <Stack.Screen name="CounsellorMenuScreen" component={CounsellorMenu} />
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
