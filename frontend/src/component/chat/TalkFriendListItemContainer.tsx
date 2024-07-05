import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useHome } from "../context/HomeContext";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import ChatView from "../../view/Chat/ChatView";

const TalkFriendListItemContainer = (props) => {
  const { loginUser, setUnreadMessageJSON, unreadMessagesJSON } = useHome();

  const [roomID, setRoomID] = useState("");
  const [unreadMessagesDisplay, setUnreadMessagesDisplay] = useState([]);
  const navigation = useNavigation();

  let roomGetID;
  let unsubscribe;

  useEffect(() => {
    const watchMessage = () => {
      console.log(13);
      console.log(props.roomID, props.friendID);
      console.log("chatData", `${loginUser.uid}`, `${roomGetID}`, "messages");

      // ドキュメント参照を取得
      if (loginUser.uid && roomGetID) {
        const docRef = doc(
          db,
          "chatData",
          `${loginUser.uid}`,
          `${roomGetID}`,
          "messages"
        );
        // リアルタイムリスナーを設定
        unsubscribe = onSnapshot(docRef, async (docSnapshot) => {
          const unreadMessages = [];

          console.log("Talkonsnapない");

          const myID = loginUser.uid;
          const friendID = props.FriendData.id;
  
          if (myID.toLowerCase() < friendID.toLowerCase()) {
            roomGetID = myID + friendID;
            setRoomID(roomGetID);
          }
          if (myID.toLowerCase() > friendID.toLowerCase()) {
            roomGetID = friendID + myID;
            setRoomID(roomGetID);
          }

          console.log("79");
          console.log(docSnapshot.exists());
          if (docSnapshot.exists()) {
            const data = docSnapshot.data().messages;
            console.log(docSnapshot.data().messages);
            console.log(22);
            if (data.length === 0) {
              return;
            }
            data.forEach((messageObject) => {
              console.log(62);
              console.log(messageObject);
              // Alert.alert(messageObject.message);
              unreadMessages.push(messageObject);
            });
            console.log(unreadMessages);
            unreadMessages.sort(
              (a, b) => new Date(b.sendAt) - new Date(a.sendAt)
            );
            console.log(36);
            // setUnreadMessagesDisplay([
            //   ...removeDuplicates([...unreadMessages]),
            // ]);
            console.log(getRoomID())
            setUnreadMessageJSON((prev) => {
              return {
                ...prev,
                [roomGetID]: removeDuplicates([...(prev[roomGetID] || []), ...unreadMessages])
              };
            });

            if (data && data.length > 0) {
              for (const message of data) {
                try {
                  // AsyncStorageに保存
                  //   const storageKey = `${props.roomID}-${message.sendAt}`;
                  //   await AsyncStorage.setItem(storageKey, JSON.stringify(message));
                  //setGetmessageArray(data.messages)
                  console.log(30);
                  // Firestoreから削除
                  //sortMessageArray(data.messages)
                  await updateDoc(docRef, {
                    messages: arrayRemove(message),
                  });
                } catch (error) {
                  console.error(
                    "Error saving message to AsyncStorage or deleting from Firestore:",
                    error
                  );
                }
              }
            }
          }
        });
      }
    };

    const getDate = async () => {
      try {
        if (!loginUser) {
          return;
        }
        console.log(loginUser.uid);
        console.log(props.id);
        const myID = loginUser.uid;
        const friendID = props.FriendData.id;

        if (myID.toLowerCase() < friendID.toLowerCase()) {
          roomGetID = myID + friendID;
          setRoomID(roomGetID);
        }
        if (myID.toLowerCase() > friendID.toLowerCase()) {
          roomGetID = friendID + myID;
          setRoomID(roomGetID);
        }
        watchMessage();
        console.log(49);
      } catch (e) {
        console.log(e);
      }
    };
    getDate();

    const getRoomID=async ()=>{
      const myID = loginUser.uid;
      const friendID = props.FriendData.id;

      if (myID.toLowerCase() < friendID.toLowerCase()) {
        roomGetID = myID + friendID;
        return setRoomID(roomGetID);
      }
      if (myID.toLowerCase() > friendID.toLowerCase()) {
        roomGetID = friendID + myID;
        return setRoomID(roomGetID);
      }

    }

    // コンポーネントのクリーンアップ時にリスナーを解除
    return () => {
      unsubscribe;
      console.log("unsubscribe");
    };
  }, [props.roomID, props.myID]);

  function removeDuplicates(data) {
    const seen = new Set();
    return data.filter((item) => {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        return true;
      }
      return false;
    });
  }

  // useEffect(() => {
  //   setUnreadMessageJSON({[roomID]:unreadMessagesDisplay});
  // }, [unreadMessagesDisplay]);

  return (
    <TouchableOpacity
      className="flex justify-start border-t border-silver flex-row pl-2 items-center py-4 px-4"
      onPress={() =>
        navigation.navigate("ChatView", {
          friend: { userid: props.FriendData.id },
        })
      }
    >
      <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
      <View className="flex-grow">
        <Text className="text-xl">{props.FriendData.name}</Text>
        <Text>
          {unreadMessagesJSON &&
            unreadMessagesJSON.hasOwnProperty(roomID) &&
            unreadMessagesJSON[roomID] &&
            unreadMessagesJSON[roomID].length !== 0 &&
            unreadMessagesJSON[roomID][unreadMessagesJSON[roomID].length - 1]
              .message}
        </Text>
      </View>
      {unreadMessagesJSON &&
        unreadMessagesJSON.hasOwnProperty(roomID) &&
        unreadMessagesJSON[roomID] &&
        unreadMessagesJSON[roomID].length != 0 && (
          <View className="bg-[#30CB89] rounded-xl">
            <Text className="text-lg color-white w-10 text-center">
              {unreadMessagesJSON[roomID].length}
            </Text>
          </View>
        )}
      {/* <Text>{JSON.stringify(unreadMessagesJSON)}</Text> */}
    </TouchableOpacity>
  );
};

export default TalkFriendListItemContainer;
