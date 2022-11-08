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
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ViewCreatedArticlesSubPage = () => {
  const navigation = useNavigation();
  const articleCollectionRef = collection(db, "Articles");
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (search === null || search === "") {
      const getAtricles = async () => {
        const value = await AsyncStorage.getItem("UserID");
        const user = JSON.parse(value);
        const filterdData = query(
          articleCollectionRef,
          where("authorID", "==", user)
        );
        const querySnapshot = await getDocs(filterdData);
        setArticles(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      };
      getAtricles();
    }
    searchArticles();
  }, [search, articles]);

  const searchArticles = () => {
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.author.toLowerCase().includes(search.toLowerCase())
    );
    setArticles(filtered);
  };

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
            onChangeText={(text) => setSearch(text)}
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
              {articles.map((article, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ViewCreatedArticleScreen", {
                        id: article.id,
                      })
                    }
                  >
                    <View style={styles.articleContainer}>
                      <Image
                        source={{ uri: article.image }}
                        style={styles.image}
                      />
                      <View style={styles.articleDetails}>
                        <Text style={styles.articleName}>{article.title}</Text>
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

  hashTags: {
    fontSize: 13,
    color: "#19212B",
    fontWeight: "400",
    marginTop: 5,
  },
});

export default ViewCreatedArticlesSubPage;
