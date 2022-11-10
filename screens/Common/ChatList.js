import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getDatabase, get, ref } from "firebase/database";
import TopBar from "../../components/Common/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ChatList = () => {
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const [userName, setUserName] = useState(null);
  const [user, setUser] = useState(null);
  const [reciever, setReciever] = useState(null);

  const database = getDatabase();

  useEffect(() => {
    const getUser = async () => {
      const value = await AsyncStorage.getItem("UserName");
      const user = JSON.parse(value);
      setUserName(user);

      const mySnapshot = await get(ref(database, `users/${user}/friends`));
      setFriends(mySnapshot.val());

      const Snapshot = await get(ref(database, `users/${user}`));
      setUser(Snapshot.val());
    };
    // const renderFriends = async () => {
    //   const frSnapshot = await get(
    //     ref(database, `users/${friends[0].username}`)
    //   );
    //   setReciever(frSnapshot.val());

    getUser();
  }, []);

  const onClick = (friend) => {
    get(ref(database, `users/${friend.username}`)).then((snapshot) => {
      console.log(user);
      navigation.navigate("ChatScreen", {
        user: user,
        reciever: snapshot.val(),
      });
    });
  };
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <TopBar title={"Messages"} />
        <View style={{ margin: 20 }}>
          {friends.map((friend) => {
            return (
              <TouchableOpacity onPress={() => onClick(friend)}>
                <View style={styles.counsellorContainer}>
                  <Image source={{ uri: friend.avatar }} style={styles.image} />
                  <View style={styles.counsellorDetails}>
                    <Text style={styles.counsellorName}>{friend.username}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBF0F9",
    height: "100%",
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
export default ChatList;
