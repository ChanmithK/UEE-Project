import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import FormikLogin from "./FormikLogin";

const LoginForm = () => {
  return (
    <View style={styles.container}>
      <LoginImage />
      <FormikLogin />
    </View>
  );
};

const LoginImage = () => (
  <View>
    <Image source={{ uri: "https://picsum.photos/200" }} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});

export default LoginForm;
