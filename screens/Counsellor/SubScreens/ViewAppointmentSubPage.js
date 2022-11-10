import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import TopBar from "../../../components/Common/TopBar";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useState } from "react";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { Formik } from "formik";

const ViewAppointmentSchema = Yup.object().shape({
  _note: Yup.string().required("Note is required"),
  _sessionUrl: Yup.string()
    .required("Session Url is required")
    .url("Invalid URL"),
});

const ViewAppointmentRejectSchema = Yup.object().shape({
  _note: Yup.string().required("Note is required"),
});

const ViewAppointmentSubPage = (id) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    async function fetchData() {
      const userDoc = doc(db, "CounsellorAppointments", id.id);
      const docSnap = await getDoc(userDoc);
      setData(docSnap.data());
      setLoading(false);
    }
    fetchData();
  }, []);
  const [isAcceptModalVisible, setAcceptModalVisible] = useState(false);
  const [isDeclineModalVisible, setDeclineModalVisible] = useState(false);
  const [note, setNote] = useState("");
  const [sessionUrl, setSessionUrl] = useState("");

  const toggleAcceptModal = () => {
    setAcceptModalVisible(!isAcceptModalVisible);
  };

  const toggleDeclineModal = () => {
    setDeclineModalVisible(!isDeclineModalVisible);
  };

  const acceptAppointment = async (values) => {
    const appointmentDoc = doc(db, "CounsellorAppointments", id.id);
    updateDoc(appointmentDoc, {
      status: "Approved",
      sessionUrl: values._sessionUrl,
      note: values._note,
    });

    const userDoc = doc(db, "Users", data.userId);
    const docSnap = await getDoc(userDoc);
    updateDoc(userDoc, {
      sessions: docSnap.data().sessions + 1,
    }).then(() => {
      navigation.navigate("AppointmentListScreen");
    });
  };

  const declineAppointment = (values) => {
    const appointmentDoc = doc(db, "CounsellorAppointments", id.id);
    updateDoc(appointmentDoc, {
      status: "Declined",
      note: values._note,
    }).then(() => {
      navigation.navigate("AppointmentListScreen");
    });
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
          <TopBar title={"Appointment Details"} />

          {/* Content */}
          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 30,
            }}
          >
            {/* Header Part */}
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: data.image,
                }}
                style={styles.userImage}
              />
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{ flexDirection: "row", marginLeft: 8, marginTop: -4 }}
                >
                  <Text
                    style={{
                      color: "#1A2042",
                      fontWeight: "500",
                      fontSize: 24,
                    }}
                  >
                    {data.name}
                  </Text>
                </View>
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={{
                      color: "#1A2042",
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                  >
                    Age of {data.age}
                  </Text>
                </View>
              </View>
            </View>

            {/* Field data */}
            <View style={{ maxHeight: 450 }}>
              <ScrollView>
                <View>
                  <Text style={styles.mainFieldName}>Title</Text>
                  <Text style={styles.fieldData}>{data.title}</Text>
                  <Text style={styles.mainFieldName}>Description</Text>
                  <Text style={styles.fieldData}>{data.description}</Text>
                  <Text style={styles.mainFieldName}>Date</Text>
                  <Text style={styles.fieldData}>{data.date}</Text>
                  <Text style={styles.mainFieldName}>Time</Text>
                  <Text style={styles.fieldData}>{data.time}</Text>
                </View>
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
              <View>
                <Formik
                  initialValues={{
                    _note: "",
                  }}
                  onSubmit={(values) => {
                    declineAppointment(values);
                  }}
                  validationSchema={ViewAppointmentRejectSchema}
                  validateOnMount={false}
                >
                  {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                  }) => (
                    <Modal isVisible={isDeclineModalVisible}>
                      <View
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: 10,
                        }}
                      >
                        <View style={{ padding: 10 }}>
                          <TextInput
                            placeholder="Note"
                            placeholderTextColor="gray"
                            multiline={true}
                            style={[styles.input, { height: 100 }]}
                            // onChangeText={(text) => setNote(text)}
                            onChangeText={handleChange("_note")}
                            onBlur={handleBlur("_note")}
                          />
                          {errors._note && (
                            <Text style={styles.errorText}>{errors._note}</Text>
                          )}
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: 20,
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
                              onPress={toggleDeclineModal}
                            >
                              <Text style={styles.buttonText}>Cancel</Text>
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
                              onPress={handleSubmit}
                            >
                              <Text style={styles.buttonText}>Reject</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  )}
                </Formik>
              </View>
              <TouchableOpacity
                // onPress={handleSubmit}
                style={styles.buttonContainer}
                onPress={toggleDeclineModal}
              >
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>

              <View>
                <Formik
                  initialValues={{
                    _note: "",
                    _sessionUrl: "",
                  }}
                  onSubmit={(values) => {
                    acceptAppointment(values);
                  }}
                  validationSchema={ViewAppointmentSchema}
                  validateOnMount={false}
                >
                  {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                  }) => (
                    <Modal isVisible={isAcceptModalVisible}>
                      <View
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: 10,
                        }}
                      >
                        <View style={{ padding: 10 }}>
                          <TextInput
                            placeholder="Session URL"
                            placeholderTextColor="gray"
                            // multiline={true}
                            // value="https://meet.google.com/lookup/abc"
                            style={styles.input}
                            // onChangeText={(text) => setSessionUrl(text)}
                            onChangeText={handleChange("_sessionUrl")}
                            onBlur={handleBlur("_sessionUrl")}

                            // value={values.bio}
                          />
                          {errors._sessionUrl && (
                            <Text style={styles.errorText}>
                              {errors._sessionUrl}
                            </Text>
                          )}
                          <TextInput
                            placeholder="Note"
                            placeholderTextColor="gray"
                            multiline={true}
                            // value="Note"
                            style={[styles.input, { height: 100 }]}
                            // onChangeText={(text) => setNote(text)}
                            onChangeText={handleChange("_note")}
                            onBlur={handleBlur("_note")}

                            // onChangeText={handleChange("bio")}
                            // value={values.bio}
                          />
                          {errors._note && (
                            <Text style={styles.errorText}>{errors._note}</Text>
                          )}
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: 20,
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
                              onPress={toggleAcceptModal}
                            >
                              <Text style={styles.buttonText}>Cancel</Text>
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
                              onPress={handleSubmit}
                            >
                              <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  )}
                </Formik>
              </View>

              <TouchableOpacity
                // onPress={handleSubmit}
                style={styles.buttonContainer}
                onPress={toggleAcceptModal}
              >
                <Text style={styles.buttonText}>Accept</Text>
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
  userImage: {
    width: 89,
    height: 89,
    borderRadius: 100,
  },
  mainFieldName: {
    color: "#1A2042",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 35,
  },
  fieldData: {
    color: "#19212B",
    fontSize: 15,
    fontWeight: "400",
    marginTop: 10,
  },
  buttonContainer: {
    // marginHorizontal: 10,
    // marginVertical: 10,

    padding: 10,
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: "#ED6A8C",
    width: 155,
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
  input: {
    backgroundColor: "#F2F2F2",
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

  errorText: {
    color: "red",
    // fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
    textAlign: "left",
  },
});

export default ViewAppointmentSubPage;
