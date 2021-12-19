import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Image, Platform, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/CredentialsContext";
import axios from "axios";

import { MainContainer, MainTitle, Container, Title, Label, Label2, Label3, SpaceButton } from "../components/styles";
import { LinearGradient } from "expo-linear-gradient";

export default function Space({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  return (
    <MainContainer>
      <MainTitle>이제 우리 반려 동물을{"\n"}만나러 가볼까요?</MainTitle>

      <SpaceButton onPress={() => navigation.navigate("CreateSpace")} style={{ marginBottom: 30 }}>
        <LinearGradient
          colors={["#8743FF", "#4136F1"]}
          start={{ x: 1, y: 0 }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Label3>새로운 반려동물 프로필 만들기</Label3>
        </LinearGradient>
      </SpaceButton>

      <SpaceButton
        onPress={() => navigation.navigate("JoinSpace")}
        style={{
          borderWidth: "2",
          borderStyle: "solid",
          borderColor: "#8743ff",
        }}
      >
        <LinearGradient
          colors={["#ffffff", "#ffffff"]}
          start={{ x: 0.0, y: 1 }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#611DF2", fontSize: 17 }}>이미 등록했어요!</Text>
          <Label3 style={{ color: "#611DF2", margin: 7 }}>기존 반려동물 프로필 보러가기</Label3>
        </LinearGradient>
      </SpaceButton>

      <StatusBar style="dark" />
    </MainContainer>
  );
}
