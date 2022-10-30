import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const AppointmentCard = () => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>Dilani Samanthika</Text>
          <Text style={styles.date}>Sun 16 Oct 14.40</Text>
        </View>
        <View>
          <Image
            style={styles.status}
            source={require("../../../assets/icons/RedOval.svg")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  date: {
    fontSize: 13,
    paddingTop: 10,
    fontFamily: "Arial",
  },
  status: {
    marginTop: 2,
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});
export default AppointmentCard;
