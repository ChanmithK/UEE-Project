import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import TopBar from "../Common/TopBar";
import { Image } from "react-native";
import { MENTORSLIST } from "../Data/Mentors";
import { APPOINTMENTS } from "../Data/Appointments";

const BookedAppointments = () => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <View style={{ height: windowHeight }}>
      <TopBar title="Booked Appointments" isFilterAvailable="true" />
      <View style={styles.MainContainer}>
        <SearchBar />
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppointmentList />
          </ScrollView>
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

const AppointmentList = () => (
  <View style={{ marginBottom: 250 }}>
    {APPOINTMENTS.map((appointment, index) => (
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
          {appointment.status === 1 ? (
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
          ) : appointment.status === 2 ? (
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
