import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 characters minimum"),
  Repassword: Yup.string()
    .required("Re-enter Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  email: Yup.string().email().required("Email is required"),
  fullName: Yup.string().required("FullName is required"),
  age: Yup.number().required("Age is required"),
  bio: Yup.string()
    .required("Bio is required")
    .max(200, "Bio is too long - should be 200 characters maximum"),
  position: Yup.string().required("Position is required"),
});

const FormikRegister = () => {
  const usersCollectionRef = collection(db, "Users");
  const [selectedValue, setSelectedValue] = useState("");

  const createUser = async (values) => {
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        fullName: "",
        age: "",
        Repassword: "",
        bio: "",
        position: "",
      }}
      onSubmit={(values) => {
        createUser(values);
      }}
      validationSchema={RegisterSchema}
      validateOnMount={false}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
        <>
          <View style={styles.container}>
            <View style={styles.textfield}>
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="gray"
                multiline={false}
                style={styles.input}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
            </View>
            {errors.fullName && (
              <Text style={styles.formikErrorMessage}>{errors.fullName}</Text>
            )}

            <View style={styles.textfield}>
              <TextInput
                placeholder="Age"
                placeholderTextColor="gray"
                keyboardType="numeric"
                multiline={false}
                style={styles.input}
                onChangeText={handleChange("age")}
                onBlur={handleBlur("age")}
                value={values.age}
              />
            </View>
            {errors.age && (
              <Text style={styles.formikErrorMessage}>{errors.age}</Text>
            )}

            <View
              style={{
                borderRadius: 5,
                borderWidth: 1,
                paddingVertical: 0,
                borderColor: "gray",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Picker
                style={styles.pickerStyle}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="Member" value="0" />
                <Picker.Item label="Counsellor" value="1" />
                <Picker.Item label="Mentor" value="2" />
              </Picker>
            </View>

            {selectedValue === "1" || selectedValue === "2" ? (
              <View>
                <View style={styles.textfield}>
                  <TextInput
                    placeholder="Bio"
                    placeholderTextColor="gray"
                    multiline={true}
                    style={[styles.input, { height: 120 }]}
                    onChangeText={handleChange("bio")}
                    onBlur={handleBlur("bio")}
                    value={values.bio}
                  />
                </View>
                {errors.bio && (
                  <Text style={styles.formikErrorMessage}>{errors.bio}</Text>
                )}

                <View style={styles.textfield}>
                  <TextInput
                    placeholder="Position"
                    placeholderTextColor="gray"
                    multiline={false}
                    style={styles.input}
                    onChangeText={handleChange("position")}
                    onBlur={handleBlur("position")}
                    value={values.position}
                  />
                </View>
                {errors.position && (
                  <Text style={styles.formikErrorMessage}>
                    {errors.position}
                  </Text>
                )}
              </View>
            ) : null}

            <View style={styles.textfield}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                multiline={false}
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            {errors.email && (
              <Text style={styles.formikErrorMessage}>{errors.email}</Text>
            )}

            <View style={styles.textfield}>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="gray"
                multiline={false}
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            {errors.password && (
              <Text style={styles.formikErrorMessage}>{errors.password}</Text>
            )}

            <View style={styles.textfield}>
              <TextInput
                placeholder="Re-enter Password"
                secureTextEntry={true}
                placeholderTextColor="gray"
                multiline={false}
                style={styles.input}
                onChangeText={handleChange("Repassword")}
                onBlur={handleBlur("Repassword")}
                value={values.Repassword}
              />
            </View>
            {errors.Repassword && (
              <Text style={styles.formikErrorMessage}>{errors.Repassword}</Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              backgroundColor: "#04b040",
              borderRadius: 15,
              paddingHorizontal: 15,
              paddingVertical: 5,
              alignItems: "center",
              shadowColor: "#E67E22",
              shadowOpacity: 0.8,
              elevation: 8,
            }}
            onPress={() => {
              let options = {
                mediaType: "photo",
                includeBase64: true,
                quality: 1,
              };
              launchImageLibrary({ noData: true });
            }}
          >
            <Text>Open</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  textfield: {
    padding: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },

  buttonContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  formikErrorMessage: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
    marginTop: -5,
  },
  pickerStyle: {
    borderColor: "gray",
    borderRadius: 5,
    justifyContent: "center",
    fontSize: 12,
  },
});

export default FormikRegister;
