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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CreateArticleSubPage = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;
  const articleCollectionRef = collection(db, "Articles");

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [hashTags, setHashTags] = useState("");

  const [user, setUser] = useState("");

  useEffect(() => {
    const getAppointments = async () => {
      const value = await AsyncStorage.getItem("UserData");
      const user = JSON.parse(value);
      setUser(user);
    };

    getAppointments();
  }, []);

  const createArticle = async () => {
    addDoc(articleCollectionRef, {
      authorID: user.id,
      author: user.name,
      image:
        "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: title,
      description: description,
      category: category,
      hashTags: hashTags,
    })
      .then((docRef) => {
        navigation.navigate("ViewCreatedArticlesScreen");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
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
                  onChangeText={(text) => setTitle(text)}
                />
                <Text style={styles.mainFieldName}>Category</Text>
                <TextInput
                  multiline={true}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setCategory(text)}
                />
                <Text style={styles.mainFieldName}>Description</Text>
                <TextInput
                  placeholderTextColor="white"
                  multiline={true}
                  style={[styles.input, { height: 145 }]}
                  onChangeText={(text) => setDescription(text)}
                />
                <Text style={styles.mainFieldName}>HashTags</Text>
                <TextInput
                  multiline={true}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setHashTags(text)}
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
              onPress={createArticle}
            >
              <Text style={styles.buttonText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
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
