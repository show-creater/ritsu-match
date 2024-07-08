import { View, Text, SafeAreaView, ScrollView,KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useHome } from "../../component/context/HomeContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import HomeFooter from "../../component/footer/HomeFooter";
import SendBoxContainer from "../../component/chat/SendBoxContainer";
import MessageListContainer from "../../component/chat/messageListContainer";

const ChatView = () => {
  const {
    isLogin,
    setIsLogin,
    loginUser,
    setLoginUser,
    talkPage,
    setTalkPage,
  } = useHome();

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params.friend;
  const [roomID, setRoomID] = useState("");

  const childRef = useRef();


  const SendMessage=async(messageObject)=>{
    console.log(messageObject)
    if (childRef.current) {
      childRef.current.sendMessage(messageObject);
    }
  }

  useEffect(() => {
    let roomGetID;
    const getDate = async () => {
      try {
        if (!route.params.friend) {
          return;
        }
        if (!loginUser) {
          return;
        }
        console.log(loginUser.uid);
        console.log(route.params.friend.userid);
        const myID = loginUser.uid;
        const friendID = route.params.friend.userid;

        if (myID.toLowerCase() < friendID.toLowerCase()) {
          roomGetID = myID + friendID;
          setRoomID(roomGetID);
        }
        if (myID.toLowerCase() >= friendID.toLowerCase()) {
          roomGetID = friendID + myID;
          setRoomID(roomGetID);
        }
        console.log(49)

        // const docRef = doc(db, "chat", roomGetID);
        // const docSnap = await getDoc(docRef);
        // console.log(53)

        // if (!docSnap.exists()) {
        //   return;
        // }
      } catch (e) {
        console.log(e);
      }
    };
    getDate();
  }, [route.params.friend, loginUser]);

  return (
    <View
     style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <MessageListContainer ref={childRef} myID={loginUser.uid} roomID={roomID} friend={route.params.friend.userid}/>
          </ScrollView>
        </View>
        <SendBoxContainer roomID={roomID} friend={route.params.friend.userid} myID={loginUser.uid} SendMessage={(messageObject)=>SendMessage(messageObject)}/>
      </SafeAreaView>
    </View>
  );
};

export default ChatView;
