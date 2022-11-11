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
import React, { useEffect, useState } from "react";
import TopBar from "../../../components/Common/TopBar";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

const ViewCounsellorsSubPage = () => {
  const navigation = useNavigation();

  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [counsellorList, setCounsellorList] = useState([]);

  useEffect(() => {
    const getcounsellors = async () => {
      const counsellors = await getDocs(
        query(collection(db, "Users"), where("role", "==", "Counsellor"))
      );
      setCounsellorList(
        counsellors.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setSearchResult(
        counsellors.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getcounsellors();
  }, []);

  const searchCounsellor = (text) => {
    setSearchKey(text);

    setSearchResult(
      counsellorList.filter((counsellor) =>
        counsellor.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <TopBar title={"Counsellors"} />

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
            onChangeText={(text) => searchCounsellor(text)}
            value={searchKey}
          />
          <Image
            source={{
              uri: "https://img.icons8.com/ios/50/000000/search--v1.png",
            }}
            style={styles.searchIcon}
          />
        </View>

        {/* Counsellors List */}
        <View style={{ marginTop: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={{ marginBottom: 250 }}>
                {searchResult.map((counsellor, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("ViewCounsellorScreen", {
                        id: counsellor.id,
                      })
                    }
                  >
                    <View style={styles.counsellorContainer} key={index}>
                      <Image
                        source={{ uri: counsellor.image }}
                        style={styles.image}
                      />
                      <View style={styles.counsellorDetails}>
                        <Text style={styles.counsellorName}>
                          {counsellor.name}
                        </Text>
                        <Text style={styles.counsellorStatus}>
                          {counsellor.position}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
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
  counsellorContainer: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignSelf: "center",
  },
  counsellorDetails: {
    marginLeft: 10,
    justifyContent: "center",
  },
  counsellorName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1A2042",
  },
  counsellorStatus: {
    fontSize: 13,
    fontWeight: "400",
    color: "#1A2042",
  },
});

export default ViewCounsellorsSubPage;
