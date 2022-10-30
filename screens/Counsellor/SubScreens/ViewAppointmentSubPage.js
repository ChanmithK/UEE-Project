import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import TopBar from "../../../components/Common/TopBar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";

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
          <TouchableOpacity
            // onPress={handleSubmit}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={handleSubmit}
            style={styles.buttonContainer}
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
});

export default ViewAppointmentSubPage;
