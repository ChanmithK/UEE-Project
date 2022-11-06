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
import { useNavigation } from "@react-navigation/native";

const ViewCounsellorSubPage = ({ id }) => {
  const [data, setData] = useState("");
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "Users", id);
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
      <TopBar title={"Profile"} />

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
          <View style={{ flexDirection: "column", alignSelf: "center" }}>
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
                {data.position}
              </Text>
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text
                style={{ color: "#1A2042", fontSize: 16, fontWeight: "500" }}
              >
                {data.sessions} sessions
              </Text>
            </View>
          </View>
        </View>

        {/* Field data */}
        <View style={{ maxHeight: 450 }}>
          <ScrollView>
            <View>
              <Text style={styles.mainFieldName}>About Counsellor</Text>
              <Text style={styles.fieldData}>{data.bio}</Text>
              <Text style={styles.mainFieldName}>Email</Text>
              <Text style={styles.fieldData}>{data.email}</Text>
              {/* <Text style={styles.mainFieldName}>Date of birth</Text>
              <Text style={styles.fieldData}>{data.dob}</Text> */}
              <Text style={styles.mainFieldName}>Sex</Text>
              <Text style={styles.fieldData}>{data.sex}</Text>
              <Text style={styles.mainFieldName}>Working time</Text>
              <Text style={styles.fieldData}>
                Mon - Sat ({data.workingTimeFrom} - {data.workingTimeTo})
              </Text>
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
            onPress={
              //toggleDeclineModal
              () => {
                navigation.navigate("MakeAppointmentScreen", {
                  id: id,
                  name: data.name,
                  role: data.role,
                  image: data.image,
                });
              }
            }
          >
            <Text style={styles.buttonText}>Book an appointment</Text>
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
});

export default ViewCounsellorSubPage;
