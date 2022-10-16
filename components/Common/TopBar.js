import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import React from "react";

const TopBar = ({ title, isFilterAvailable }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.icon}
          source={require("../../assets/icons/left-arrow.png")}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {isFilterAvailable === "true" ? (
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../assets/icons/filter.png")}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 30 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 5,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
  },
});

export default TopBar;
