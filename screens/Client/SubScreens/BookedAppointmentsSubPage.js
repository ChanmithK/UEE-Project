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
import { TouchableOpacity } from "react-native-gesture-handler";
const { useNavigation } = require("@react-navigation/native");
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookedAppointments = () => {
  const windowHeight = Dimensions.get("window").height;

  const navigation = useNavigation();

  const [appointmentList, setAppointmentList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      const value = await AsyncStorage.getItem("UserID");
      const user = JSON.parse(value);

      const appointments = await getDocs(
        query(
          collection(db, "CounsellorAppointments"),
          where("userId", "==", user)
        )
      );
      setAppointmentList(
        appointments.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setSearchResult(
        appointments.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getAppointments();
  }, [appointmentList]);

  const searchAppointments = (text) => {
    setSearchKey(text);

    setSearchResult(
      appointmentList.filter(
        (appointment) =>
          appointment.time.toLowerCase().includes(text.toLowerCase()) ||
          appointment.date.toLowerCase().includes(text.toLowerCase()) ||
          appointment.description.toLowerCase().includes(text.toLowerCase()) ||
          appointment.name.toLowerCase().includes(text.toLowerCase())
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

const AppointmentList = ({ searchResult }) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginBottom: 250 }}>
      {searchResult.map((appointment, index) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewClientAppointmentScreen", {
              id: appointment.id,
            })
          }
          key={index}
        >
          <View style={styles.appointmentContainer} key={index}>
            <Image
              source={{ uri: appointment.counsellorImage }}
              style={styles.image}
            />
            <View style={styles.appointmentDetails}>
              <Text style={styles.appointmentName}>
                {appointment.counsellorName}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  color: "#ED6A8C",
                  marginBottom: -2,
                }}
              >
                {appointment.person}{" "}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={styles.appointmentDate}>{appointment.date} </Text>
                <Text style={styles.appointmentTime}> {appointment.time}</Text>
              </View>
            </View>
            <View style={{ position: "absolute" }}>
              {appointment.status === "Declined" ? (
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
        </TouchableOpacity>
      ))}
    </View>
  );
};

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
    left: 320,
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
    marginTop: 20,
  },
});

export default BookedAppointments;
