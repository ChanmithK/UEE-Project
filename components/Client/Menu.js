import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import TopBar from "../Common/TopBar";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <TopBar title={"Menu"} />

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("")}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("BookedAppointmentsScreen")}
        >
          <Text>Booked Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewMentorsScreen")}
        >
          <Text>Mentors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewCounsellorsScreen")}
        >
          <Text>Counsellors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewArticlesScreen")}
        >
          <Text>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("")}>
          <Text>Saved</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
  },

  articleTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1A2042",
  },
  articleText: {
    fontSize: 13,
    color: "#1A2042",
    marginTop: 34,
    lineHeight: 22,
    fontWeight: "400",
  },
  articleAuthor: {
    fontSize: 13,
    color: "#1A2042",
    marginTop: 34,
    fontWeight: "500",
  },
  articleCategory: {
    fontSize: 13,
    color: "#1A2042",
    marginTop: 3,
    fontWeight: "500",
  },
});

export default Menu;
