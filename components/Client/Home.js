import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MENTORS } from "../Data/Mentors";
import { ARTICLES } from "../Data/Articles";

const Home = () => {
  return (
    <View style={styles.MainContainer}>
      <Header />
      <Categories />
      <Mentors />
      <Counsellors />
      <Articles />
    </View>
  );
};

const Header = () => (
  <View style={{ flexDirection: "row" }}>
    <Image
      source={{
        uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }}
      style={styles.userImage}
    />
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row", marginLeft: 8, marginTop: -4 }}>
        <Text style={{ color: "#1A2042", fontWeight: "400", fontSize: 24 }}>
          Hi,
        </Text>
        <Text style={{ color: "#ED6A8C", fontWeight: "700", fontSize: 24 }}>
          {" "}
          Senuri
        </Text>
      </View>
      <View style={{ marginLeft: 8 }}>
        <Text style={{ color: "#818184", fontSize: 18, fontWeight: "400" }}>
          How do you feel today?
        </Text>
      </View>
    </View>
  </View>
);

const Categories = () => (
  <View style={{ flexDirection: "column" }}>
    <Text
      style={{
        fontSize: 16,
        fontWeight: "700",
        color: "#1A2042",
        marginTop: 35,
      }}
    >
      Categories
    </Text>
    <View style={styles.CategoryContainer}>
      <TouchableOpacity>
        <View style={styles.CategoryBox}>
          <Image
            source={require("../assets/Images/book.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text style={styles.CategoryBoxText}>Articles</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.CategoryBox}>
          <Image
            source={require("../assets/Images/mentor.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text style={styles.CategoryBoxText}>Mentors</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.CategoryBox}>
          <Image
            source={require("../assets/Images/counsellor.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text style={styles.CategoryBoxText}>Counsellors</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const Mentors = () => (
  <View style={styles.UserContainer}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ fontSize: 16, fontWeight: "700", color: "#1A2042" }}>
        Top mentors
      </Text>
      <TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#ED6A8C" }}>
          view all
        </Text>
      </TouchableOpacity>
    </View>
    {MENTORS.map((mentor, index) => (
      <TouchableOpacity key={index}>
        <View style={styles.UserBox}>
          <Image source={{ uri: mentor.image }} style={styles.UserImage} />
          <View style={styles.UserDetails}>
            <Text style={styles.UserName}>{mentor.name}</Text>
            <Text style={styles.UserPosition}>{mentor.category}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image
                source={{
                  uri: "https://img.icons8.com/windows/32/000000/menu-2.png",
                }}
                style={{
                  position: "absolute",
                  left: 120,
                  width: 20,
                  height: 20,
                  tintColor: "#000000",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const Counsellors = () => (
  <View style={styles.UserContainer}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "700", color: "#1A2042" }}>
        Top counsellors
      </Text>
      <TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#ED6A8C" }}>
          view all
        </Text>
      </TouchableOpacity>
    </View>
    {MENTORS.map((mentor, index) => (
      <TouchableOpacity key={index}>
        <View style={styles.UserBox}>
          <Image source={{ uri: mentor.image }} style={styles.UserImage} />
          <View style={styles.UserDetails}>
            <Text style={styles.UserName}>{mentor.name}</Text>
            <Text style={styles.UserPosition}>{mentor.category}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image
                source={{
                  uri: "https://img.icons8.com/windows/32/000000/menu-2.png",
                }}
                style={{
                  position: "absolute",
                  left: 120,
                  width: 20,
                  height: 20,
                  tintColor: "#000000",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const Articles = () => (
  <View style={styles.ArticleContainer}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "700", color: "#1A2042" }}>
        Top counsellors
      </Text>
      <TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#ED6A8C" }}>
          view all
        </Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {ARTICLES.map((article, index) => (
        <TouchableOpacity key={index}>
          <View style={styles.ArticleBox}>
            <Image
              source={{ uri: article.image }}
              style={styles.ArticleImage}
            />
            <View style={styles.ArticleDetails}>
              <Text style={styles.ArticleTitle}>{article.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  userImage: {
    width: 51,
    height: 51,
    borderRadius: 100,
  },
  MainContainer: {
    padding: 15,
  },
  CategoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  CategoryBox: {
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  CategoryBoxText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 10,
  },
  UserContainer: {
    marginTop: 20,
  },
  UserBox: {
    position: "relative",
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: -5,
  },
  UserDetails: {
    marginLeft: 20,
    justifyContent: "center",
  },
  UserName: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  UserPosition: {
    color: "#818184",
    fontSize: 10,
    fontWeight: "400",
  },
  UserImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  ArticleContainer: {
    marginTop: 20,
  },
  ArticleBox: {
    position: "relative",
    flexDirection: "column",
    marginTop: 15,
    borderRadius: 10,
    padding: 10,
    marginVertical: -5,
    marginRight: 20,
  },
  ArticleDetails: {
    justifyContent: "center",
  },
  ArticleTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  ArticleImage: {
    width: 250,
    height: 160,
    borderRadius: 10,
  },
});

export default Home;
