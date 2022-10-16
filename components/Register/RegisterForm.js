import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import FormikRegister from "./FormikRegister";

const RegisterForm = () => {
  return (
    <ScrollView style={styles.container}>
      <RegisterImage />
      <FormikRegister />
    </ScrollView>
  );
};

const RegisterImage = () => (
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

export default RegisterForm;
