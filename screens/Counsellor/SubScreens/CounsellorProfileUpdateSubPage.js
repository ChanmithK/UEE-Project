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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const CounsellorProfileUpdateSubPage = () => {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    async function fetchData() {
      const value = await AsyncStorage.getItem("UserID");
      const user = JSON.parse(value);
      setId(user);

      const userDoc = doc(db, "Users", user);
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
    }
    fetchData();
    setName(data.name);
    setBio(data.bio);
    setAge(data.age);
  }, [data.name, data.bio, data.age]);

  const updateProfile = () => {
    const userDoc = doc(db, "Users", id);
    updateDoc(userDoc, {
      name: name,
      bio: bio,
      age: age,
    }).then(() => navigation.navigate("CounsellorProfileScreen"));
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={10}
        enabled
      >
        {/* Top bar */}
        <TopBar title={"Edit Profile"} />

        {/* Content */}
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 30,
          }}
        >
          {/* Header Part */}
          <View>
            <Image
              source={{
                uri: data.image,
              }}
              style={styles.userImage}
            />
          </View>

          {/* Field data */}
          <View style={{ maxHeight: 400 }}>
            <ScrollView>
              <View>
                <Text style={styles.mainFieldName}>Name</Text>
                <TextInput
                  multiline={true}
                  defaultValue={data.name}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setName(text)}
                />
                <Text style={styles.mainFieldName}>Bio</Text>
                <TextInput
                  placeholderTextColor="white"
                  multiline={true}
                  defaultValue={data.bio}
                  style={[styles.input, { height: 145 }]}
                  onChangeText={(text) => setBio(text)}
                />
                <Text style={styles.mainFieldName}>Age</Text>
                <TextInput
                  multiline={true}
                  defaultValue={data.age}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setAge(text)}
                />
                {/* <Text style={styles.mainFieldName}>Sex</Text>
                <TextInput
                  multiline={true}
                  defaultValue={data.sex}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setSex(text)}
                /> */}
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

export default CounsellorProfileUpdateSubPage;
