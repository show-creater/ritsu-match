import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import HomeFooter from "../../component/footer/HomeFooter";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useHome } from "../../component/context/HomeContext";
import { AntDesign } from "@expo/vector-icons";
import FriendListItem from "./FriendListItem";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

const Friends = (props,{ navigation }) => {
  const { isLogin, setIsLogin, talkPage, setTalkPage } = useHome();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const a = 0;
  const styles = StyleSheet.create({
    container1: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    footer: {
      position: "absolute",
      bottom: 0,
      height: "10%",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    main: {
      paddingTop: "10%",
    },
    container: {
      height: windowHeight, //これが悪い
      flexDirection: "row",
      padding: "auto",
      flexWrap: "wrap",
      width: windowWidth,
    },
    containerBox: {
      width: "47%",
      height: "28%",
      borderRadius: 15,
      shadowColor: "#333",
      shadowOpacity: 0.3,
      shadowRadius: 3,
      backgroundColor: "white",
      margin: 5.5,
    },
    containerImg: {
      height: "60%",
    },
    containerTextTime: {
      position: "absolute",
      zIndex: 1,
      top: 123, //アイフォン１５ではちょうどいい高さ、パーセントが使えない
      width: "100%",
      height: "15%",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    containerTextName: {
      fontSize: 30,
      textAlign: "center",
      paddingTop: 15,
    },
    containerTextInformation: {
      fontSize: 15,
      textAlign: "center",
      paddingTop: 8,
      color: "black",
      opacity: 0.5,
    },
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
      marginTop: "45%",
      alignItems: "center",
      flexDirection: "column",
    },
    personInfo: {
      width: "100%",
      justifyContent: "flex-start",
      borderTopWidth: 1,
      borderTopColor: "silver",
      flexDirection: "row",
      paddingLeft: "2%",
      alignItems: "center",
      paddingVertical: "4%",
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
  const [getHartPushFriendArray, setGetHartPushFriendArray] = useState([]);
  const getHartPushFriendData = async () => {
    try {
        const myDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        const myData = myDoc.data();
        console.log(183,myData);
        if(!myData.hasOwnProperty("heart_pushed")) return
console.log(183,myData.heart_pushed);
        if(myData.heart_pushed){
            const hartFriendIDs = myData.heart_pushed;
            console.log(184,hartFriendIDs);
            const chatFriendDataArray = [];
            for(const friend of hartFriendIDs){
              const friendDoc = await getDoc(doc(db, "users", friend));
              if(friendDoc.exists()){
              chatFriendDataArray.push({name:friendDoc.data().name, id:friendDoc.id,age:friendDoc.data().age});
              }
            }


            console.log(191,chatFriendDataArray);
            setGetHartPushFriendArray(chatFriendDataArray);
          }

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getHartPushFriendData();
  }, []);
// useEffect(() => {
//   props.createRoom("qwerewqwerew","ewrtrewqertewrt")
// }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", width: windowWidth }}>
      {/* <ScrollView style={{}}> */}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {getHartPushFriendArray.map((friend) =>          <FriendListItem id={friend.id} age={friend.age} name={friend.name} navigation={navigation}  createRoom={(id,name)=>props.createRoom(id,name)}/>

        )}

      </View>
      {/* </ScrollView> */}
    </View>
  );
};
export default Friends;
