import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import TopBar from "../../../components/Common/TopBar";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";

const MakeAppointmentSchema = Yup.object().shape({
  _title: Yup.string()
    .required("Title is required!")
    .max(50, "Bio is too long - should be 50 characters maximum"),
  _description: Yup.string()
    .required("Description is required")
    .max(200, "Description is too long - should be 200 characters maximum"),
});

const MakeAppointmentSubPage = ({ id, name, role, image }) => {
  const navigation = useNavigation();

  const windowHeight = Dimensions.get("window").height;
  const appointmentCollectionRef = collection(db, "CounsellorAppointments");

  const [mydate, setDate] = useState(new Date());
  const [newDate, setNewDate] = useState("");
  const [newtime, setNewTime] = useState("");
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

  const createAppointment = async (values) => {
    const value = await AsyncStorage.getItem("UserID");
    const user = JSON.parse(value);

    const userDoc = doc(db, "Users", user);
    const docSnap = await getDoc(userDoc);
    const client = docSnap.data();

    if (!newDate.trim()) {
      alert("Please Enter Date and Time");
      return;
    } else {
      addDoc(appointmentCollectionRef, {
        counsellorId: id,
        counsellorName: name,
        userId: user,
        appointmentId: Math.random() * 100000,
        name: client.name,
        age: client.age,
        image: client.image,
        date: newDate,
        time: newtime,
        description: values._description,
        title: values._title,
        status: "Pending",
        person: role,
        counsellorImage: image,
      })
        .then(navigation.navigate("BookedAppointmentsScreen"))
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  return (
    <Formik
      initialValues={{
        _title: "",
        _description: "",
        // _date: "",
        // _time: "",
      }}
      onSubmit={(values) => {
        createAppointment(values);
      }}
      validationSchema={MakeAppointmentSchema}
      validateOnMount={false}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors }) => (
        <>
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={10}
              enabled
            >
              {/* Top bar */}
              <TopBar title={"Make appointment"} />

              {/* Content */}
              <View
                style={{
                  marginHorizontal: 10,
                  marginVertical: 30,
                }}
              >
                {/* Field data */}
                <View>
                  <ScrollView>
                    <View>
                      <Text style={styles.mainFieldName}>Title</Text>
                      <TextInput
                        multiline={true}
                        style={[styles.input, { height: 40 }]}
                        // onChangeText={(text) => setTitle(text)}
                        onChangeText={handleChange("_title")}
                        onBlur={handleBlur("_title")}
                        value={values._title}
                      />
                      {errors._title && (
                        <Text style={styles.formikErrorMessage}>
                          {errors._title}
                        </Text>
                      )}
                      <Text style={styles.mainFieldName}>Description</Text>
                      <TextInput
                        placeholderTextColor="white"
                        multiline={true}
                        style={[styles.input, { height: 145 }]}
                        // onChangeText={(text) => setDescription(text)}
                        onChangeText={handleChange("_description")}
                      />
                      {errors._description && (
                        <Text style={styles.formikErrorMessage}>
                          {errors._description}
                        </Text>
                      )}

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
                            defaultValue={newDate ? newDate : "Date"}
                            editable={false}
                            style={[styles.input, { height: 40, width: "85%" }]}
                            // onChangeText={(text) => setSex(text)}
                            // onChangeText={handleChange("_date")}
                            // onBlur={handleBlur("_date")}
                            // value={values._date}
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
                            value={newtime ? newtime : "Time"}
                            editable={false}
                            style={[styles.input, { height: 40, width: "85%" }]}
                            // onChangeText={(text) => setSex(text)}
                            // onChangeText={handleChange("_time")}
                            // onBlur={handleBlur("_time")}
                            // value={values._time}
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
                    </View>

                    {isDisplayDate && (
                      <DateTimePicker
                        value={mydate}
                        mode={displaymode}
                        is24Hour={true}
                        display="default"
                        onChange={changeSelectedDate}
                      />
                    )}
                  </ScrollView>
                </View>

                {/* Buttons */}
                <View
                  style={{
                    position: "absolute",
                    top: windowHeight - 180,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    // onPress={handleSubmit}
                    style={{
                      backgroundColor: "#ED6A8C",
                      width: "100%",
                      height: 50,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                      marginTop: 30,
                      //   marginHorizontal: 0,
                    }}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Make Appointment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </>
      )}
    </Formik>
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
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
  formikErrorMessage: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 5,
  },
});

export default MakeAppointmentSubPage;
