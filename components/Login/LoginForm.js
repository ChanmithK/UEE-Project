import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import FormikLogin from "./FormikLogin";
import { useHeaderHeight } from "@react-navigation/elements";

const LoginForm = () => {
  return (
    <View>
      <LoginImage />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-150}
        enabled
      >
        <View style={styles.LoginContaier}>
          <View style={styles.FormikForm}>
            <Text style={styles.MainTitle}>Bloom</Text>
            <Text style={styles.SubTitle}>
              We help you to be the best version of yourself.
            </Text>
            <FormikLogin />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const LoginImage = () => (
  <View>
    <Image
      style={styles.Image}
      source={require("../assets/Images/LoginImage.png")}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  LoginContaier: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 500,
    // marginTop: 10,
  },
  FormikForm: {
    padding: 20,
  },
  MainTitle: {
    fontSize: 30,
    marginHorizontal: 8,
    color: "#1A2042",
    fontFamily: "Roboto",
    fontWeight: "800",
  },
  SubTitle: {
    fontSize: 15,
    marginHorizontal: 8,
    color: "#1A2042",
    fontFamily: "Roboto",
    fontWeight: "600",
  },
  Image: {
    width: 310,
    height: 340,
    marginLeft: 50,
  },
});

export default LoginForm;
