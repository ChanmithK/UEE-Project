import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import TopBar from "../../../components/Common/TopBar";
import { useNavigation } from "@react-navigation/native";

const ViewArticlesSubPage = ({ article }) => {
  console.log(article);
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <TopBar title={""} />

      {/* Content */}
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 30,
        }}
      >
        {/* Atricles List */}
        <View style={{ marginTop: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 150 }}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Image
                source={{
                  uri: article.image,
                }}
                style={styles.image}
              />
              <Text style={styles.articleText}>{article.description}</Text>
              <Text style={styles.articleAuthor}>Author: {article.author}</Text>
              <Text style={styles.articleCategory}>
                Category: {article.category}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 21,
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

export default ViewArticlesSubPage;
