import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ViewArticleSubPage from "./SubScreens/ViewArticleSubPage";

const ViewArticle = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ViewArticleSubPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default ViewArticle;