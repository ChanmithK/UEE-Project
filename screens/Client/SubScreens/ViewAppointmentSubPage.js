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

const ViewClientAppointmentSubPage = () => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "CounsellorAppointments", "b0ehYF0bai99EHFjwzxz");
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
    }
    fetchData();
    setName(data.name);
    setBio(data.bio);
    setDob(data.dob);
    setSex(data.sex);
  }, [data.name, data.bio, data.dob, data.sex]);

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
          {/* Field data */}
          <View style={{ maxHeight: 560 }}>
            <ScrollView>
              <View style={{ marginBottom: 100 }}>
                <Text style={styles.mainFieldName}>Status</Text>
                <TextInput
                  multiline={true}
                  editable={false}
                  defaultValue={data.status ? data.status : "No status"}
                  style={[
                    styles.input,
                    { height: 40, color: "#ED6A8C", fontWeight: "bold" },
                  ]}
                  onChangeText={(text) => setName(text)}
                />
                <Text style={styles.mainFieldName}>Title</Text>
                <TextInput
                  multiline={true}
                  editable={false}
                  defaultValue={data.title}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setName(text)}
                />
                <Text style={styles.mainFieldName}>Description</Text>
                <TextInput
                  placeholderTextColor="white"
                  editable={false}
                  multiline={true}
                  defaultValue={data.description}
                  style={[styles.input, { height: 145 }]}
                  onChangeText={(text) => setBio(text)}
                />
                <Text style={styles.mainFieldName}>Date</Text>
                <TextInput
                  multiline={true}
                  editable={false}
                  defaultValue={data.date}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setDob(text)}
                />
                <Text style={styles.mainFieldName}>Time</Text>
                <TextInput
                  multiline={true}
                  editable={false}
                  defaultValue={data.time}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setSex(text)}
                />
                {data.status === "Accepted" ? (
                  <>
                    <Text style={styles.mainFieldName}>Session Link</Text>
                    <TextInput
                      multiline={true}
                      editable={false}
                      defaultValue={
                        data.sessionUrl ? data.sessionUrl : "No link"
                      }
                      style={[styles.input, { height: 40 }]}
                      onChangeText={(text) => setSex(text)}
                    />
                  </>
                ) : null}
                <Text style={styles.mainFieldName}>Counsellor/Mentor Note</Text>
                <TextInput
                  placeholderTextColor="white"
                  editable={false}
                  multiline={true}
                  defaultValue={data.note ? data.note : "No note"}
                  style={[styles.input, { height: 145 }]}
                  onChangeText={(text) => setBio(text)}
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
            {data.status === "Accepted" ? (
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
                //   onPress={updateProfile}
              >
                <Text style={styles.buttonText}>Start a conversation</Text>
              </TouchableOpacity>
            ) : null}

            {/* Rejected Appointment */}
            {data.status === "Declined" ? (
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
                //   onPress={updateProfile}
              >
                <Text style={styles.buttonText}>Book again</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Pending Appointment */}
          {data.status === "Pending" ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 0,
                marginVertical: 10,
                marginHorizontal: 10,
                marginLeft: 0,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#ED6A8C",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  // justifyContent: "center",
                  width: "50%",
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 10,
                }}
                // onPress={toggleAcceptModal}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#ED6A8C",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                  alignSelf: "center",
                  marginLeft: 10,
                  marginTop: 20,
                  marginBottom: 10,
                }}
                // onPress={acceptAppointment}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ) : null}
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ViewClientAppointmentSubPage;
