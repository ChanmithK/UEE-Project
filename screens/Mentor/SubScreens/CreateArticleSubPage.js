import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import TopBar from "../../../components/Common/TopBar";
import { db } from "../../../firebase";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { Formik } from "formik";
import { ARTICLES } from "../../../components/Data/Articles";

const CreateArticleSchema = Yup.object().shape({
  _description: Yup.string()
    .required("Description is required")
    .max(200, "Description is too long - should be 200 characters maximum"),
  _category: Yup.string().required("Category is required"),
  _title: Yup.string().required("Title is required"),
});

const CreateArticleSubPage = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;
  const articleCollectionRef = collection(db, "Articles");

  const imageData = ARTICLES[Math.floor(Math.random() * ARTICLES.length)];

  const [user, setUser] = useState("");

  useEffect(() => {
    const getAppointments = async () => {
      const value = await AsyncStorage.getItem("UserData");
      const user = JSON.parse(value);
      setUser(user);
    };

    getAppointments();
  }, []);

  const createArticle = async (values) => {
    addDoc(articleCollectionRef, {
      authorID: user.id,
      author: user.name,
      image: imageData.image,
      title: values._title,
      description: values._description,
      category: values._category,
    })
      .then((docRef) => {
        navigation.navigate("ViewCreatedArticlesScreen");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <Formik
      initialValues={{
        _description: "",
        _category: "",
        _title: "",
        _hashTags: "",
      }}
      onSubmit={(values) => {
        createArticle(values);
      }}
      validationSchema={CreateArticleSchema}
      validateOnMount={false}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={10}
            enabled
          >
            {/* Top bar */}
            <TopBar title={"Create Article"} />

            {/* Content */}
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 30,
              }}
            >
              {/* Field data */}
              <View>
                <ScrollView>
                  <View>
                    <Text style={styles.mainFieldName}>Title</Text>
                    <TextInput
                      multiline={true}
                      style={[styles.input, { height: 40 }]}
                      // onChangeText={(text) => setTitle(text)}
                      onChangeText={handleChange("_title")}
                      onBlur={handleBlur("_title")}
                    />
                    {errors._title && (
                      <Text style={{ color: "red" }}>{errors._title}</Text>
                    )}

                    <Text style={styles.mainFieldName}>Category</Text>
                    <TextInput
                      multiline={true}
                      style={[styles.input, { height: 40 }]}
                      // onChangeText={(text) => setCategory(text)}
                      onChangeText={handleChange("_category")}
                      onBlur={handleBlur("_category")}
                    />
                    {errors._category && (
                      <Text style={{ color: "red" }}>{errors._category}</Text>
                    )}
                    <Text style={styles.mainFieldName}>Description</Text>
                    <TextInput
                      placeholderTextColor="white"
                      multiline={true}
                      style={[styles.input, { height: 145 }]}
                      // onChangeText={(text) => setDescription(text)}
                      onChangeText={handleChange("_description")}
                      onBlur={handleBlur("_description")}
                    />
                    {errors._description && (
                      <Text style={{ color: "red" }}>
                        {errors._description}
                      </Text>
                    )}
                    <Text style={styles.mainFieldName}>HashTags</Text>
                    <TextInput
                      multiline={true}
                      style={[styles.input, { height: 40 }]}
                      // onChangeText={(text) => setHashTags(text)}
                      onChangeText={handleChange("_hashTags")}
                      onBlur={handleBlur("_hashTags")}
                    />
                  </View>
                </ScrollView>
              </View>

              {/* Buttons */}
              <View
                style={{
                  position: "absolute",
                  top: windowHeight - 180,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // marginTop: 20,
                }}
              >
                <TouchableOpacity
                  // onPress={handleSubmit}
                  style={{
                    backgroundColor: "#ED6A8C",
                    width: "100%",
                    height: 50,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: 30,
                    //   marginHorizontal: 0,
                  }}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Publish</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
  userImage: {
    width: 149,
    height: 149,
    borderRadius: 100,
    alignSelf: "center",
  },
  mainFieldName: {
    color: "#1A2042",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
  },
  fieldData: {
    color: "#19212B",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    border: "2px solid red",
    padding: 10,
    fontSize: 15,
    color: "black",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#ED6A8C",
    width: "100%",
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});

export default CreateArticleSubPage;
