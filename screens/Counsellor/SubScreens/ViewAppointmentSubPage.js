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
} from "react-native";
import React, { useEffect } from "react";
import TopBar from "../../../components/Common/TopBar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";
import Modal from "react-native-modal";

const ViewAppointmentSubPage = () => {
  const [data, setData] = useState("");
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "CounsellorAppointments", "b0ehYF0bai99EHFjwzxz");
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
    }
    fetchData();
  }, []);
  const [isAcceptModalVisible, setAcceptModalVisible] = useState(false);
  const [isDeclineModalVisible, setDeclineModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [sessionUrl, setSessionUrl] = useState("");

  const toggleAcceptModal = () => {
    setAcceptModalVisible(!isAcceptModalVisible);
  };

  const toggleDeclineModal = () => {
    setDeclineModalVisible(!isDeclineModalVisible);
  };

  const acceptAppointment = () => {
    const appointmentDoc = doc(
      db,
      "CounsellorAppointments",
      "b0ehYF0bai99EHFjwzxz"
    );
    updateDoc(appointmentDoc, {
      status: "Accepted",
      sessionUrl: sessionUrl,
      note: note,
      //   age: 23,
    });
  };

  const declineAppointment = () => {
    const appointmentDoc = doc(
      db,
      "CounsellorAppointments",
      "b0ehYF0bai99EHFjwzxz"
    );
    updateDoc(appointmentDoc, {
      status: "Declined",
      note: note,
      //   age: 23,
    });
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <TopBar title={"Appointment Details"} />

      {/* Content */}
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 30,
        }}
      >
        {/* Header Part */}
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{
              uri: data.image,
            }}
            style={styles.userImage}
          />
          <View style={{ flexDirection: "column" }}>
            <View
              style={{ flexDirection: "row", marginLeft: 8, marginTop: -4 }}
            >
              <Text
                style={{ color: "#1A2042", fontWeight: "500", fontSize: 24 }}
              >
                {data.name}
              </Text>
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text
                style={{ color: "#1A2042", fontSize: 16, fontWeight: "400" }}
              >
                Age of {data.age}
              </Text>
            </View>
          </View>
        </View>

        {/* Field data */}
        <View style={{ maxHeight: 450 }}>
          <ScrollView>
            <View>
              <Text style={styles.mainFieldName}>Title</Text>
              <Text style={styles.fieldData}>{data.title}</Text>
              <Text style={styles.mainFieldName}>Description</Text>
              <Text style={styles.fieldData}>{data.description}</Text>
              <Text style={styles.mainFieldName}>Date</Text>
              <Text style={styles.fieldData}>{data.date}</Text>
              <Text style={styles.mainFieldName}>Time</Text>
              <Text style={styles.fieldData}>{data.time}</Text>
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
          <View>
            <Modal isVisible={isDeclineModalVisible}>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 10,
                }}
              >
                <View style={{ padding: 10 }}>
                  <TextInput
                    placeholder="Note"
                    placeholderTextColor="gray"
                    multiline={true}
                    style={[styles.input, { height: 100 }]}
                    onChangeText={(text) => setNote(text)}

                    // onChangeText={handleChange("bio")}
                    // value={values.bio}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
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
                      onPress={toggleDeclineModal}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
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
                      onPress={declineAppointment}
                    >
                      <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <TouchableOpacity
            // onPress={handleSubmit}
            style={styles.buttonContainer}
            onPress={toggleDeclineModal}
          >
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>

          <View>
            <Modal isVisible={isAcceptModalVisible}>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 10,
                }}
              >
                <View style={{ padding: 10 }}>
                  <TextInput
                    placeholder="Session URL"
                    placeholderTextColor="gray"
                    // multiline={true}
                    // value="https://meet.google.com/lookup/abc"
                    style={styles.input}
                    onChangeText={(text) => setSessionUrl(text)}
                    // value={values.bio}
                  />
                  <TextInput
                    placeholder="Note"
                    placeholderTextColor="gray"
                    multiline={true}
                    // value="Note"
                    style={[styles.input, { height: 100 }]}
                    onChangeText={(text) => setNote(text)}

                    // onChangeText={handleChange("bio")}
                    // value={values.bio}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
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
                      onPress={toggleAcceptModal}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
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
                      onPress={acceptAppointment}
                    >
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <TouchableOpacity
            // onPress={handleSubmit}
            style={styles.buttonContainer}
            onPress={toggleAcceptModal}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: 89,
    height: 89,
    borderRadius: 100,
  },
  mainFieldName: {
    color: "#1A2042",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 35,
  },
  fieldData: {
    color: "#19212B",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 10,
  },
  buttonContainer: {
    // marginHorizontal: 10,
    // marginVertical: 10,

    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: "#ED6A8C",
    width: 155,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F2F2F2",
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
    fontSize: 15,
    textAlign: "center",
  },
});

export default ViewAppointmentSubPage;
