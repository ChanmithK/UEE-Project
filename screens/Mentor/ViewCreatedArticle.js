import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import ViewCreatedArticleSubPage from "./SubScreens/ViewCreatedArticleSubPage";

const ViewCreatedArticle = ({ navigation, route }) => {
  const id = route.params.id;

  return (
    <SafeAreaView style={styles.container}>
      <ViewCreatedArticleSubPage id={id} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
});

export default ViewCreatedArticle;
