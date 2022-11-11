import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopBar from "../../../components/Common/TopBar";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

const ViewCreatedArticleSubPage = ({ id }) => {
  const navigation = useNavigation();
  const height = Dimensions.get("window").height;
  const [article, setArticle] = React.useState([]);
  const docRef = doc(db, "Articles", id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAtricles = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setArticle(docSnap.data());
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };
    getAtricles();
  }, []);

  const deleteArticle = () => {
    const articleDoc = doc(db, "Articles", id);
    deleteDoc(articleDoc);

    navigation.navigate("ViewCreatedArticlesScreen");
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ED6A8C"
          style={{ marginVertical: "100%" }}
        />
      ) : (
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
            <View style={{ marginTop: 10, maxHeight: 560 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 150 }}>
                  <Text style={styles.articleTitle}>
                    {article.title ? article.title : "Title"}
                  </Text>
                  <Image
                    source={{
                      uri: article.image
                        ? article.image
                        : "https://picsum.photos/200",
                    }}
                    style={styles.image}
                  />
                  <Text style={styles.articleText}>
                    {article.description ? article.description : "Content"}
                  </Text>

                  <Text style={styles.articleCategory}>
                    Category: {article.category ? article.category : "Category"}
                  </Text>
                  <Text style={styles.hashTags}>
                    HashTags: {article.hashTags ? article.hashTags : "HashTags"}
                  </Text>
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: height - 700,
                marginVertical: 10,
                marginHorizontal: 10,
                marginLeft: 0,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#ED6A8C",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  // justifyContent: "center",
                  width: "50%",
                  alignSelf: "center",
                  marginTop: 20,
                  marginBottom: 10,
                }}
                onPress={deleteArticle}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#ED6A8C",
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                  alignSelf: "center",
                  marginLeft: 10,
                  marginTop: 20,
                  marginBottom: 10,
                }}
                onPress={() =>
                  navigation.navigate("UpdateArticleScreen", {
                    id: id,
                  })
                }
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
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
  hashTags: {
    marginTop: 3,
    fontSize: 13,
    color: "#1A2042",
    fontWeight: "500",
  },
  articleCategory: {
    fontSize: 13,
    color: "#1A2042",
    marginTop: 34,
    fontWeight: "500",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ViewCreatedArticleSubPage;
