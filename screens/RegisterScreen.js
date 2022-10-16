import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import RegisterForm from "../components/Register/RegisterForm";

const RegisterScreen = () => {
  return (
    <SafeAreaView>
      <RegisterForm />
    </SafeAreaView>
  );
};

export default RegisterScreen;
