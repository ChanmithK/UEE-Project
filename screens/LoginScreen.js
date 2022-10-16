import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import LoginForm from "../components/Login/LoginForm";

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <LoginForm />
    </SafeAreaView>
  );
};

export default LoginScreen;
