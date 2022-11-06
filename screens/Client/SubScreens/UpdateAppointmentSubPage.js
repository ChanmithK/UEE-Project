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
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect } from "react";
import TopBar from "../../../components/Common/TopBar";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const UpdateAppointmentSubPage = ({ data, id }) => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;

  const [mydate, setDate] = useState(new Date());
  const [description, setDescription] = useState(data.description);
  const [title, setTitle] = useState(data.title);
  const [newDate, setNewDate] = useState(data.date);
  const [newtime, setNewTime] = useState(data.time);
  const [displaymode, setMode] = useState("time");
  const [isDisplayDate, setShow] = useState(false);

  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;

    let tempData = new Date(currentDate);
    let fDate =
      tempData.getDate() +
      "/" +
      (tempData.getMonth() + 1) +
      "/" +
      tempData.getFullYear();

    let timeM;
    if (
      tempData.getMinutes() === 0 ||
      tempData.getMinutes() === 1 ||
      tempData.getMinutes() === 2 ||
      tempData.getMinutes() === 3 ||
      tempData.getMinutes() === 4 ||
      tempData.getMinutes() === 5 ||
      tempData.getMinutes() === 6 ||
      tempData.getMinutes() === 7 ||
      tempData.getMinutes() === 8 ||
      tempData.getMinutes() === 9
    ) {
      timeM = `0${tempData.getMinutes()}`;
    } else {
      timeM = tempData.getMinutes();
    }
    let fTime = tempData.getHours() + ":" + timeM;
    setDate(currentDate);
    setNewDate(fDate);
    setNewTime(fTime);
    if (displaymode === "date") {
      setShow(false);
    }
    if (displaymode === "time") {
      setShow(false);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const displayDatepicker = () => {
    showMode("date");
  };

  const displayTimepicker = () => {
    showMode("time");
  };

  const updateAppointment = async () => {
    if (title === "" || description === "") {
      Alert.alert("Please fill all the fields");
    } else {
      const appointmentRef = doc(db, "CounsellorAppointments", id);
      await updateDoc(appointmentRef, {
        title: title,
        description: description,
        date: newDate,
        time: newtime,
      });
      Alert.alert("Appointment Updated");
      navigation.navigate("Appointments");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={10}
        enabled
      >
        {/* Top bar */}
        <TopBar title={"Appointment details"} />

        {/* Content */}
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 30,
          }}
        >
          {/* Field data */}
          <View style={{ maxHeight: 560 }}>
            <ScrollView>
              <View style={{ marginBottom: 100 }}>
                <Text style={styles.mainFieldName}>Status</Text>
                <TextInput
                  multiline={true}
                  editable={false}
                  defaultValue={data.status ? data.status : "No status"}
                  style={[
                    styles.input,
                    { height: 40, color: "#ED6A8C", fontWeight: "bold" },
                  ]}
                />

                <Text style={styles.mainFieldName}>Title</Text>
                <TextInput
                  value={title}
                  multiline={true}
                  defaultValue={data.title}
                  style={[styles.input, { height: 40 }]}
                  onChangeText={(text) => setTitle(text)}
                />

                <Text style={styles.mainFieldName}>Description</Text>
                <TextInput
                  value={description}
                  placeholderTextColor="white"
                  multiline={true}
                  defaultValue={data.description}
                  style={[styles.input, { height: 145 }]}
                  onChangeText={(text) => setDescription(text)}
                />

                <TouchableOpacity onPress={displayDatepicker}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <TextInput
                      multiline={true}
                      defaultValue={data.date ? data.date : "Date"}
                      value={newDate}
                      editable={false}
                      style={[styles.input, { height: 40, width: "89%" }]}
                      onChangeText={(text) => setSex(text)}
                    />
                    <Image
                      source={{
                        uri: "https://img.icons8.com/ios/50/null/calendar-30.png",
                      }}
                      style={{
                        height: 30,
                        width: 30,
                        marginTop: 15,
                        marginLeft: 10,
                      }}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={displayTimepicker}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <TextInput
                      multiline={true}
                      defaultValue={newtime ? newtime : "Time"}
                      editable={false}
                      style={[styles.input, { height: 40, width: "89%" }]}
                      onChangeText={(text) => setSex(text)}
                    />
                    <Image
                      source={{
                        uri: "https://img.icons8.com/ios/50/null/time--v1.png",
                      }}
                      style={{
                        height: 30,
                        width: 30,
                        marginTop: 15,
                        marginLeft: 10,
                      }}
                    />
                  </View>
                </TouchableOpacity>

                {isDisplayDate && (
                  <DateTimePicker
                    value={mydate}
                    mode={displaymode}
                    is24Hour={true}
                    display="default"
                    onChange={changeSelectedDate}
                  />
                )}
              </View>
            </ScrollView>
          </View>

          {/* Buttons */}
          {/* <View
            style={{
              position: "absolute",
              top: windowHeight - 180,
              flexDirection: "row",
              justifyContent: "space-between",
              // marginTop: 20,
            }}
          ></View> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 0,
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
                justifyContent: "center",
                width: "100%",
                alignSelf: "center",
                marginVertical: 10,
                marginTop: 20,
                marginBottom: 10,
              }}
              onPress={updateAppointment}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
  userImage: {
    width: 149,
    height: 149,
    borderRadius: 100,
    alignSelf: "center",
  },
  mainFieldName: {
    color: "#1A2042",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
  },
  fieldData: {
    color: "#19212B",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    border: "2px solid red",
    padding: 10,
    fontSize: 15,
    color: "black",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#ED6A8C",
    width: "100%",
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default UpdateAppointmentSubPage;
