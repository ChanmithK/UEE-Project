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
} from "react-native";
import React, { useEffect } from "react";
import TopBar from "../../../components/Common/TopBar";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const UpdateArticleSubPage = ({ id }) => {
  const navigation = useNavigation();

  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [hashTags, setHashTags] = useState("");
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "Articles", id);
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
    }
    fetchData();
    setTitle(data.title);
    setDescription(data.description);
    setCategory(data.category);
    setHashTags(data.hashTags);
  }, [data.title, data.description, data.category, data.hashTags]);

  const updateProfile = () => {
    const userDoc = doc(db, "Articles", id);
    updateDoc(userDoc, {
      title: title,
      description: description,
      category: category,
      hashTags: hashTags,
    });
    navigation.navigate("ViewCreatedArticlesScreen");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={10}
        enabled
      >
        {/* Top bar */}
        <TopBar title={"Edit Article"} />

        {/* Content */}
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 30,
          }}
        >
          {/* Header Part */}

          {/* Field data */}
          <View style={{ maxHeight: 550 }}>
            <ScrollView>
              <View>
                <Image
                  source={{
                    uri: data.image,
                  }}
                  style={styles.userImage}
                />
              </View>
              <View>
                <Text style={styles.mainFieldName}>Title</Text>
                <TextInput
                  multiline={true}
                  defaultValue={data.title}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setTitle(text)}
                />
                <Text style={styles.mainFieldName}>Description</Text>
                <TextInput
                  placeholderTextColor="white"
                  multiline={true}
                  defaultValue={data.description}
                  style={[styles.input, { height: 145 }]}
                  onChangeText={(text) => setDescription(text)}
                />
                <Text style={styles.mainFieldName}>Category</Text>
                <TextInput
                  multiline={true}
                  defaultValue={data.category}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setCategory(text)}
                />
                <Text style={styles.mainFieldName}>HashTags</Text>
                <TextInput
                  multiline={true}
                  defaultValue={data.hashTags}
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
              onPress={updateProfile}
            >
              <Text style={styles.buttonText}>Update</Text>
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
    width: "100%",
    height: 190,
    borderRadius: 10,
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

export default UpdateArticleSubPage;
