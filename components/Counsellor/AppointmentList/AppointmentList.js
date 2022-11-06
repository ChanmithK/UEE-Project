import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import TopBar from "../../../components/Common/TopBar";
import { Image } from "react-native";
import { APPOINTMENTS } from "../../Data/Appointments";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import BottomTabs, { bottomTabIcons } from "../../Common/BottomTabs";

const AppointmentList = () => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <View style={{ height: windowHeight }}>
      <TopBar title="Appointments" isFilterAvailable="true" />
      <View style={styles.MainContainer}>
        {/* <SearchBar /> */}
        <View>
          <CounsellorAppointmentList />
          <BottomTabs icons={bottomTabIcons} />
        </View>
      </View>
    </View>
  );
};

const SearchBar = () => (
  <View>
    <TextInput
      placeholder="Search"
      secureTextEntry={true}
      placeholderTextColor="gray"
      multiline={false}
      style={styles.input}
      //   onChangeText={handleChange("password")}
      //   onBlur={handleBlur("password")}
      //   value={values.password}
    />
    <Image
      source={{ uri: "https://img.icons8.com/ios/50/000000/search--v1.png" }}
      style={styles.searchIcon}
    />
  </View>
);

const CounsellorAppointmentList = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState(null);

  // console.log("value", search);
  const usersCollectionRef = query(
    collection(db, "CounsellorAppointments"),
    where("status", "==", "Pending")
  );
  useEffect(() => {
    if (search === null || search === "") {
      const getAppointments = async () => {
        const value = await AsyncStorage.getItem("UserID");
        const user = JSON.parse(value);

        const filterdData = query(
          usersCollectionRef,
          where("counsellorId", "==", user)
        );
        const querySnapshot = await getDocs(filterdData);
        setAppointments(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      };
      getAppointments();
    }
    searchAppointment();
  }, [search]);

  const searchAppointment = () => {
    const filtered = appointments.filter((appointment) =>
      appointment.name.toLowerCase().includes(search.toLowerCase())
    );
    setAppointments(filtered);
  };
  return (
    <View>
      <View>
        <TextInput
          placeholder="Search"
          placeholderTextColor="gray"
          multiline={false}
          style={styles.input}
          onChangeText={(text) => setSearch(text)}
          //   onChangeText={handleChange("password")}
          //   onBlur={handleBlur("password")}
          //   value={values.password}
        />
        <Image
          source={{
            uri: "https://img.icons8.com/ios/50/000000/search--v1.png",
          }}
          style={styles.searchIcon}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 250 }}>
          {appointments.map((appointment, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("ViewAppointmentScreen", {
                  id: appointment.id,
                })
              }
            >
              <View style={styles.appointmentContainer}>
                <Image
                  source={{ uri: appointment.image }}
                  style={styles.image}
                />
                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentName}>{appointment.name}</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <Text style={styles.appointmentDate}>
                      {appointment.date}{" "}
                    </Text>
                    <Text style={styles.appointmentTime}>
                      {" "}
                      {appointment.time}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    position: "absolute",
    left: 90,
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
    marginTop: 10,
  },
});

export default AppointmentList;
