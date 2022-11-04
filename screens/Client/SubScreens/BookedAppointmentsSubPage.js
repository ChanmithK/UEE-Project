import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import TopBar from "../../../components/Common/TopBar";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { APPOINTMENTS } from "../../../components/Data/Appointments";
const { useNavigation } = require("@react-navigation/native");

const BookedAppointments = () => {
  const windowHeight = Dimensions.get("window").height;

  const navigation = useNavigation();

  const [appointmentList, setAppointmentList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      const appointments = await getDocs(
        query(
          collection(db, "CounsellorAppointments"),
          where("userId", "==", "kkh04HnoCIVv7kbnkXYL")
        )
      );
      setAppointmentList(appointments.docs.map((doc) => doc.data()));
      setSearchResult(appointments.docs.map((doc) => doc.data()));
    };
    getAppointments();
  }, []);

  const searchAppointments = (text) => {
    setSearchKey(text);

    setSearchResult(
      appointmentList.filter(
        (appointment) =>
          appointment.time.toLowerCase().includes(text.toLowerCase()) ||
          appointment.date.toLowerCase().includes(text.toLowerCase()) ||
          appointment.description.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={{ height: windowHeight }}>
      <TopBar title="Booked Appointments" isFilterAvailable="true" />
      <View style={styles.MainContainer}>
        <View>
          <TextInput
            placeholder="Search"
            placeholderTextColor="gray"
            multiline={false}
            style={styles.input}
            onChangeText={(text) => searchAppointments(text)}
            value={searchKey}
          />
          <Image
            source={{
              uri: "https://img.icons8.com/ios/50/000000/search--v1.png",
            }}
            style={styles.searchIcon}
          />
        </View>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppointmentList searchResult={searchResult} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const AppointmentList = ({ searchResult }) => (
  <View style={{ marginBottom: 250 }}>
    {searchResult.map((appointment, index) => (
      <View style={styles.appointmentContainer} key={index}>
        <Image source={{ uri: appointment.image }} style={styles.image} />
        <View style={styles.appointmentDetails}>
          <Text style={styles.appointmentName}>{appointment.name}</Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={styles.appointmentDate}>{appointment.date} </Text>
            <Text style={styles.appointmentTime}> {appointment.time}</Text>
          </View>
        </View>
        <View>
          {appointment.status === "Reject" ? (
            <Image
              source={{
                uri: "https://img.icons8.com/ios-glyphs/30/FF3B30/filled-circle.png",
              }}
              style={[
                styles.appointmentStatus,
                {
                  height: 15,
                  width: 15,
                },
              ]}
            />
          ) : appointment.status === "Pending" ? (
            <Image
              source={{
                uri: "https://img.icons8.com/ios-glyphs/30/FFCC00/filled-circle.png",
              }}
              style={[
                styles.appointmentStatus,
                {
                  height: 15,
                  width: 15,
                },
              ]}
            />
          ) : (
            <Image
              source={{
                uri: "https://img.icons8.com/ios-glyphs/30/4CD964/filled-circle.png",
              }}
              style={[
                styles.appointmentStatus,
                {
                  height: 15,
                  width: 15,
                },
              ]}
            />
          )}
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  MainContainer: {
    padding: 15,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    fontSize: 13,
    fontWeight: "400",
    color: "#D1D1D6",
  },
  searchIcon: {
    position: "absolute",
    top: 30,
    right: 20,
    width: 20,
    height: 20,
    resizeMode: "contain",
    color: "#8E8E93",
  },
  appointmentContainer: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignSelf: "center",
  },
  appointmentDetails: {
    marginLeft: 10,
    justifyContent: "center",
  },
  appointmentName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1A2042",
  },
  appointmentDate: {
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
  },
  appointmentTime: {
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
  },
  appointmentStatus: {
    position: "absolute",
    left: 90,
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
    marginTop: 10,
  },
});

export default BookedAppointments;
