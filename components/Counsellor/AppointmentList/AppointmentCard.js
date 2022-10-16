import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-web";

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
            source={require("../../../assets/icons/filter.png")}
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
    backgroundColor: "green",
    padding: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 13,
    paddingTop: 10,
  },
  status: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
export default AppointmentCard;
