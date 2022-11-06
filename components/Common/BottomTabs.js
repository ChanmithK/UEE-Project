import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const bottomTabIcons = [
  {
    name: "Message",
    active: "https://img.icons8.com/ios/50/ED6A8C/topic.png",
    inactive: "https://img.icons8.com/ios/50/000000/topic.png",
    page: "Message",
  },
  {
    name: "Home",
    active: "https://img.icons8.com/ios/50/ED6A8C/home--v1.png",
    inactive: "https://img.icons8.com/ios/50/000000/home--v1.png",
    page: "ClientHomeScreen",
  },
  {
    name: "Dashboard",
    active: "https://img.icons8.com/ios/50/ED6A8C/windows-11.png",
    inactive: "https://img.icons8.com/ios/50/000000/windows-11.png",
    page: "MenuScreen",
  },
];
const BottomTabs = ({ icons }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Home");

  const Icon = ({ icon }) => (
    <TouchableOpacity
      onPress={() => {
        setActiveTab(icon.name);
        navigation.navigate(icon.page);
      }}
    >
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={style.icon}
      />
    </TouchableOpacity>
  );
  return (
    <View style={style.wrapper}>
      <View style={style.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: 200,
    height: 50,
    borderRadius: 20,
    bottom: "0%",
    zIndex: 999,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    marginBottom: 20,
    elevation: 10,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 11,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
export default BottomTabs;
