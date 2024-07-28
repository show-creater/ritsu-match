import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeFooter from "../../component/footer/HomeFooter";
import { AntDesign } from "@expo/vector-icons";
import { useHome } from "../../component/context/HomeContext";
import { auth, db, storage } from "../../../firebaseConfig";
import {
  arrayUnion,
  updateDoc,
  Timestamp,
  onSnapshot,
  orderBy,
  addDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "@firebase/firestore";
import { TouchableOpacity } from "react-native";
import Friends from "./SearchResultList";
import TalkFriendListItemContainer from "../../component/chat/TalkFriendListItemContainer";

const Talk = ({ navigation }) => {
  const { isLogin, setIsLogin, talkPage, setTalkPage } = useHome();
  const windowWidth = Dimensions.get("window").width;
  const a = 0;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (talkPage && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  }, [talkPage]);

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      margin: 10,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: "#30CB89",
      height: "10%",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      width: "95%",
      top: 50,
      backgroundColor: "white",
      zIndex: 1,
    },
    icon: {
      backgroundColor: "black",
      borderRadius: 100,
      height: 60,
      width: 60,
      marginLeft: 40,
      marginRight: 10,
    },
    informations: {
      flexDirection: "column",
    },
    NameHeart: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "75%",
      paddingLeft: "5%",
      paddingBottom: 5,
    },
    heart: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    heartCount: {
      backgroundColor: "silver",
      width: "60%",
      borderRadius: 20,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: "5%",
    },
    FucilityDate: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "70%",
      paddingLeft: "3%",
    },
    personlist: {
      width: "100%",
      height: 16000,
      marginTop: "45%",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: 900,
      // backgroundColor: 'red'
    },
    footer: {
      position: "absolute",
      bottom: 0,
      height: "10%",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    personInfo: {
      width: windowWidth,
      justifyContent: "flex-start",
      borderTopWidth: 1,
      borderTopColor: "silver",
      flexDirection: "row",
      paddingLeft: "2%",
      alignItems: "center",
      paddingVertical: "4%",
      // backgroundColor: 'red'
    },
    buttonContainer: {
      width: "100%",
      justifyContent: "space-around",
      paddingHorizontal: "1%",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: "4%",
    },
    TalkButton: {
      height: "100%",
      width: "40%",
      alignItems: "center",
      marginVertical: "1%",
      borderRadius: 10,
      backgroundColor: talkPage ? "#30CB89" : "gray",
    },
    MatchingButton: {
      height: "100%",
      width: "40%",
      alignItems: "center",
      marginVertical: "1%",
      borderRadius: 10,
      backgroundColor: talkPage ? "gray" : "#30CB89",
    },
  });
  const mockFriendData = [
    {
      name: "soshi2",
      id: "po1dPfwz3LWusJaJcMOQZvKCTbk1",
    },
    {
      name: "soshi1",
      id: "pCwKh5hgOIebyR5jZW6qIzQf9OC2",
    },
    {
      name:"daichi",
      id: "mc9sTuiF4zLLkop0txfW2KW9NXb2",
    }
  ];
  return (
    //ヘッダー
    <View style={{ flex: 1, alignItems: "center", height: 1000 }} className="w-full">
      <ScrollView
        pagingEnabled={true}
        horizontal={true}
        ref={scrollViewRef}
        style={{ width: windowWidth, paddingTop: "10%" }}
      >
        <View style={{ width: windowWidth }} className="border-b border-silver">
          {mockFriendData.map((FriendData) => (
            <TalkFriendListItemContainer
            FriendData={FriendData}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default Talk;
