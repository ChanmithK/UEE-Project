import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ViewArticlesSubPage from "./SubScreens/ViewArticlesSubPage";
import BottomTabs, { bottomTabIcons } from "../../components/Common/BottomTabs";

const ViewArticles = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ViewArticlesSubPage />
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default ViewArticles;
