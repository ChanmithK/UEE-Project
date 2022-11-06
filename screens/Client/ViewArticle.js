import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ViewArticleSubPage from "./SubScreens/ViewArticleSubPage";

const ViewArticle = ({ navigation, route }) => {
  const article = route.params.article;

  return (
    <SafeAreaView style={styles.container}>
      <ViewArticleSubPage article={article} />
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
