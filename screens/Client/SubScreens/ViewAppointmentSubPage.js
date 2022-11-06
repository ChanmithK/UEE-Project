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
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ViewClientAppointmentSubPage = ({ id }) => {
  const navigation = useNavigation();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    category: "",
    counsellor: "",
    mentor: "",
    status: "",
  });
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "CounsellorAppointments", id);
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
    }
    fetchData();
  }, [id]);

  const CheckStatus = data.status ? data.status : "";

  const deleteAppointment = () => {
    console.log(id);
    Alert.alert(
      "Delete Appointment",
      "Are you sure you want to delete this appointment?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            async function deleteData() {
              const userDoc = doc(db, "CounsellorAppointments", id);
              await deleteDoc(userDoc);
            }

            deleteData().then(navigation.navigate("BookedAppointmentsScreen"));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={10}
        enabled
      >
        {/* Top bar */}
        <TopBar title={"Appointment details"} />

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
                  defaultValue={CheckStatus ? CheckStatus : "Pending"}
                  style={[
                    styles.input,
                    { height: 40, color: "#ED6A8C", fontWeight: "bold" },
                  ]}
                />
                <Text style={styles.mainFieldName}>Title</Text>
                <TextInput
                  multiline={true}
                  editable={false}
                  defaultValue={data.title}
                  style={[styles.input, { height: 40 }]}
                />
                <Text style={styles.mainFieldName}>Description</Text>
                <TextInput
                  placeholderTextColor="white"
                  editable={false}
                  multiline={true}
                  defaultValue={data.description}
                  style={[styles.input, { height: 145 }]}
                />
                <Text style={styles.mainFieldName}>Date</Text>
                <TextInput
                  multiline={true}
                  editable={false}
                  defaultValue={data.date}
                  style={[styles.input, { height: 40 }]}
                />
                <Text style={styles.mainFieldName}>Time</Text>
                <TextInput
                  multiline={true}
                  editable={false}
                  defaultValue={data.time}
                  style={[styles.input, { height: 40 }]}
                />
                {CheckStatus === "Approved" ? (
                  <>
                    <Text style={styles.mainFieldName}>Session Link</Text>
                    <TextInput
                      multiline={true}
                      editable={false}
                      defaultValue={
                        data.sessionUrl ? data.sessionUrl : "No link"
                      }
                      style={[styles.input, { height: 40 }]}
                    />
                  </>
                ) : null}
                {CheckStatus === "Approved" || CheckStatus === "Declined" ? (
                  <>
                    <Text style={styles.mainFieldName}>
                      Counsellor/Mentor Note
                    </Text>
                    <TextInput
                      placeholderTextColor="white"
                      editable={false}
                      multiline={true}
                      defaultValue={data.note ? data.note : "No note"}
                      style={[styles.input, { height: 145 }]}
                    />
                  </>
                ) : null}
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
            {CheckStatus === "Accepted" ? (
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
            {CheckStatus === "Declined" ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MakeAppointmentScreen", {
                    id: data.counsellorId,
                  })
                }
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
              >
                <Text style={styles.buttonText}>Book again</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Pending Appointment */}
          {CheckStatus === "Pending" ? (
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
                onPress={deleteAppointment}
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
                onPress={() => {
                  navigation.navigate("UpdateAppointmentScreen", {
                    data: data,
                    id: id,
                  });
                }}
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
