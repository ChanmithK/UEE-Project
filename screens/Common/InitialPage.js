import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
// import FormikLogin from "./FormikLogin";

const InitialPage = () => {
  const navigation = useNavigation();
  return (
    <View>
      <LoginImage />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-110}
        enabled
      >
        <View style={styles.LoginContaier}>
          <View style={styles.FormikForm}>
            <Text style={styles.MainTitle}>Bloom</Text>
            <Text style={styles.SubTitle}>
              To get the best user experience please select your role inside
              Bloom
            </Text>
            <View style={{ marginTop: 9 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreenUser")}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreenMentor")}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Mentor</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreenCounsellor")}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Counsellor</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: "10%" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={styles.CreateAccount}>Login</Text>
              </TouchableOpacity>
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
      source={require("../../components/assets/Images/LoginImage.png")}
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
    elevation: 10,
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
    marginTop: 3,
  },
  Image: {
    width: 310,
    height: 340,
    marginLeft: 50,
  },
  CreateAccount: {
    fontSize: 15,
    alignSelf: "center",
    color: "#ED6A8C",
  },
  buttonContainer: {
    backgroundColor: "#ED6A8C",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "700",
  },
});

export default InitialPage;
