import React, { useState, useContext, useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, Image, Text, View, Clipboard, Button, Switch } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import {
  MainContainer,
  Container,
  SpaceButton,
  StyledTextInput,
  Title,
  Label,
  Label2,
  Label3,
  Avatar,
  TestButton,
  LogOutButton,
} from "../components/styles";
import { StatusBar } from "expo-status-bar";

const URL = "http://ec2-13-209-36-69.ap-northeast-2.compute.amazonaws.com:8080";

// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

export default function NotificationSetting(props) {
  const [isEnabledGame, setIsEnabledGame] = useState(false);
  const [isEnabledCommunication, setIsEnabledCommnunication] = useState(false);
  const [isEnabledComment, setIsEnabledComment] = useState(false);
  const [isEnabledLetter, setIsEnabledLetter] = useState(false);
  const toggleSwitch = (number) => {
    switch (number) {
      case 1:
        setIsEnabledGame((previousState) => !previousState);
        break;
      case 2:
        setIsEnabledCommnunication((previousState) => !previousState);
        break;
      case 3:
        setIsEnabledComment((previousState) => !previousState);
        break;
      case 4:
        setIsEnabledLetter((previousState) => !previousState);
        break;
      default:
        break;
    }
  };

  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [token, setToken] = useState();
  const userId = 9;

  useEffect(() => {
    // Permission for iOS
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        // Check if we already have permission
        if (statusObj.status !== "granted") {
          // If permission is not there, ask for the same
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        // If permission is still not given throw error
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted.");
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const deviceToken = response.data;
        alert(deviceToken);
        setToken(deviceToken);

        console.log({ deviceToken });
        fetch(`${URL}/notice/token`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            token: deviceToken,
          }),
        });
      })
      .catch((err) => {
        // alert(`??????????????? ??????:${err}`);
        return null;
      });

    // const data = JSON.stringify({
    //   token: {
    //     value: deviceToken,
    //   },
    //   user: {
    //     name: "??????",
    //   },
    // });

    // const config = {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // };

    // axios.post("URL", data, config);
  }, []);

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener((notification) => {
      //   console.log("Notification Received!");
      //   console.log(notification);
      //   alert("Notification Received!");
      //   alert(JSON.stringify(notification));
    });
    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification Clicked!");
      alert("Notification Clicked!");
      console.log(response);
      alert(JSON.stringify(response));
    });
    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const triggerLocalNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "?????? ?????? ????????? ?????????",
        body: "??????",
      },
      trigger: null,
    });
  };

  const triggerPushNotificationHandler = () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip,deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title,
        body,
      }),
    });
  };

  return (
    <MainContainer>
      <View
        style={{
          width: "100%",
          height: "13%",
          borderRadius: 16,
          position: "absolute",
          top: -20,
          backgroundColor: "#170C59",
        }}
      >
        <Text style={{ color: "white", fontSize: 23, fontWeight: "700", textAlign: "center", top: 77 }}>?????? ??????</Text>

        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ position: "absolute", top: 80, left: 30 }}>
          <Image source={require("../assets/back-arrow.png")} />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: "#9EA2AE",
          width: "90%",
          paddingHorizontal: 10,
          fontSize: 17,
        }}
      >
        ?????? ??????
      </Text>
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          paddingVertical: 15,
          borderBottomWidth: 2,
          borderBottomColor: "#F2F4F8",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>?????? ??????</Text>
        <Switch trackColor={{ false: "#CFD3FF", true: "#424CC1" }} onValueChange={() => toggleSwitch(1)} value={isEnabledGame} />
      </View>

      <Text
        style={{
          fontSize: 17,
          color: "#9EA2AE",
          width: "90%",
          paddingHorizontal: 10,
          marginTop: 50,
        }}
      >
        ?????? ??????
      </Text>
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          paddingVertical: 15,
          borderBottomWidth: 2,
          borderBottomColor: "#F2F4F8",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>?????? ??????</Text>
        <Switch
          trackColor={{ false: "#CFD3FF", true: "#424CC1" }}
          onValueChange={() => toggleSwitch(2)}
          value={isEnabledCommunication}
        />
      </View>
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          paddingVertical: 15,
          borderBottomWidth: 2,
          borderBottomColor: "#F2F4F8",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>?????? ??????</Text>
        <Switch
          trackColor={{ false: "#CFD3FF", true: "#424CC1" }}
          onValueChange={() => toggleSwitch(3)}
          value={isEnabledComment}
        />
      </View>

      <Text
        style={{
          color: "#9EA2AE",
          width: "90%",
          paddingHorizontal: 10,
          fontSize: 17,
          marginTop: 50,
        }}
      >
        ?????????
      </Text>
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          paddingVertical: 15,
          borderBottomWidth: 2,
          borderBottomColor: "#F2F4F8",
          marginBottom: 200,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600" }}>?????? ?????? ??????</Text>
        <Switch
          trackColor={{ false: "#CFD3FF", true: "#424CC1" }}
          onValueChange={() => toggleSwitch(4)}
          value={isEnabledLetter}
        />
      </View>

      <StatusBar style="light" />
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
