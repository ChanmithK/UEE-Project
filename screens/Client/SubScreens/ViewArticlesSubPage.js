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
import React, { useEffect } from "react";
import TopBar from "../../../components/Common/TopBar";
import { ARTICLES } from "../../../components/Data/Articles";

const ViewArticlesSubPage = () => {
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <TopBar title={"Articles"} />

      {/* Content */}
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 30,
        }}
      >
        {/* SearchBar */}
        <View>
          <TextInput
            placeholder="Search"
            placeholderTextColor="gray"
            multiline={false}
            style={styles.input}
          />
          <Image
            source={{
              uri: "https://img.icons8.com/ios/50/000000/search--v1.png",
            }}
            style={styles.searchIcon}
          />
        </View>

        {/* Atricles List */}
        <View style={{ marginTop: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 250 }}>
              {ARTICLES.map((article, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => Alert.alert(article.title)}>
                    <View style={styles.articleContainer}>
                      <Image
                        source={{ uri: article.image }}
                        style={styles.image}
                      />
                      <View style={styles.articleDetails}>
                        <Text style={styles.articleName}>{article.title}</Text>
                        <Text style={styles.articleAuthor}>
                          {article.author}
                        </Text>
                        <Text style={styles.hashTags}>{article.hashTags}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
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
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    fontSize: 13,
    fontWeight: "400",
    color: "#D1D1D6",
  },
  searchIcon: {
    position: "absolute",
    top: 30,
    right: 20,
    width: 20,
    height: 20,
    resizeMode: "contain",
    color: "#8E8E93",
  },
  articleContainer: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    height: 150,
    width: "100%",
    borderRadius: 10,
  },
  articleDetails: {
    marginLeft: 10,
  },
  articleName: {
    marginTop: 11,
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  articleAuthor: {
    fontSize: 13,
    marginTop: 5,
    color: "#19212B",
    fontWeight: "400",
  },
  hashTags: {
    fontSize: 13,
    color: "#19212B",
    fontWeight: "400",
    marginTop: 5,
  },
});

export default ViewArticlesSubPage;
