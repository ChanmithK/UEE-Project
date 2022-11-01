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
              <Text style={styles.articleTitle}>
                Would you take entrepreneurship advice from a woman?
              </Text>
              <Image
                source={{
                  uri: "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                }}
                style={styles.image}
              />
              <Text style={styles.articleText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
                eleifend elementum est ac tempus amet adipiscing ornare
                sagittis. Nunc, elit laoreet risus ultricies non dui.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Id eleifend
                elementum est ac tempus amet adipiscing ornare sagittis. Nunc,
                elit laoreet risus ultricies non dui.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Id eleifend elementum est ac tempus
                amet adipiscing ornare sagittis. Nunc, elit laoreet risus
                ultricies non dui.Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Id eleifend elementum est ac tempus amet
                adipiscing ornare sagittis. Nunc, elit laoreet risus ultricies
                non dui.
              </Text>
              <Text style={styles.articleAuthor}>
                Author: Dilani Samanthika
              </Text>
              <Text style={styles.articleCategory}>
                Category: Mental Health
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
