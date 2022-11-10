import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import TopBar from "../Common/TopBar";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";

const Menu = () => {
  const navigation = useNavigation();

  const Logout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("LoginScreen");
    } catch (e) {
      console.error("Error signing out: ", e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <TopBar title={"Menu"} />

      <View style={styles.view}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('')}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("BookedAppointmentsScreen")}
        >
          <Text style={styles.text}>Booked Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewMentorsScreen")}
        >
          <Text style={styles.text}>Mentors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewCounsellorsScreen")}
        >
          <Text style={styles.text}>Counsellors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewArticlesScreen")}
        >
          <Text style={styles.text}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("")}>
          <Text style={styles.text}>Saved</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.SignOutView}>
        <TouchableOpacity style={styles.text} onPress={Logout}>
          <Text style={styles.textView}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
  },

  view: {
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 100,
  },

  text: {
    fontSize: 30,
    color: "#1A2042",
    fontFamily: "Roboto",
    fontWeight: "400",
    marginBottom: 25,
  },
  SignOutView: {
    alignItems: "center",
    flexDirection: "column",
    marginVertical: 35,
  },

  textView: {
    fontSize: 20,
    color: "#ED6A8C",
    fontFamily: "Roboto",
    fontWeight: "300",
  },
});

export default Menu;
