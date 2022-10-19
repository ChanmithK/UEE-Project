import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import React from "react";

const TopBar = ({ title, isFilterAvailable }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.icon}
          source={require("../../assets/icons/left-arrow.svg")}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {isFilterAvailable === "true" ? (
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../assets/icons/filter.svg")}
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
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1A2042",
  },
});

export default TopBar;
