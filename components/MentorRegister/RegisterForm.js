import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FormikRegister from "./FormikRegister";
import { ScrollView } from "react-native-gesture-handler";

const RegisterFormUser = () => {
  return (
    <View>
      <LoginImage />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-110}
        enabled
      >
        <View style={styles.registerContaier}>
          <View style={styles.FormikForm}>
            <Text style={styles.MainTitle}>Bloom</Text>
            <Text style={styles.SubTitle}>
              You’re one step away from getting started with Bloom.
            </Text>
            <View style={{ marginTop: 9, maxHeight: 400 }}>
              <ScrollView>
                <FormikRegister />
              </ScrollView>
            </View>
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

  registerContaier: {
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 50,
    height: 700,
    marginBottom: 20,
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
    marginTop: 3,
  },
  Image: {
    width: 400,
    height: 240,
    marginLeft: 10,
  },
  CreateAccount: {
    fontSize: 15,
    alignSelf: "center",
    color: "#ED6A8C",
  },
});

export default RegisterFormUser;
