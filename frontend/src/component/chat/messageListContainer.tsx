import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../../firebaseConfig";

const MessageListContainer = (props) => {
  console.log("props");
  console.log(props);
  let getMessageArray = [];

  const [displayMessageArray, setDisplayMessageArray] = useState([]);

    

  useEffect(() => {
    console.log(13);
    console.log(props.roomID, props.friendID);
    let unsubscribe;
    // ドキュメント参照を取得
    if (props.roomID && props.myID) {
      console.log("chatData", `${props.myID}`, `${props.roomID}`, "messages");
      const docRef = doc(
        db,
        "chatData",
        `${props.myID}`,
        `${props.roomID}`,
        "messages"
      );
      //console.log(18)
      // リアルタイムリスナーを設定
      unsubscribe = onSnapshot(docRef, async (docSnapshot) => {
        console.log("21");
        console.log(docSnapshot.exists());
        if (docSnapshot.exists()) {
          const data = docSnapshot.data().messages;
          console.log(docSnapshot.data().messages)
          console.log(22);
          const displayMessageCloneArray = displayMessageArray.concat();
          data.forEach((messageObject) => {
            console.log(messageObject);
            displayMessageCloneArray.push(messageObject);
          });
          console.log(displayMessageCloneArray);
          displayMessageCloneArray.sort(
            (a, b) => new Date(b.sendAt) - new Date(a.sendAt)
          );
          console.log(36);
          console.log(displayMessageCloneArray);

          setDisplayMessageArray(displayMessageCloneArray);

          console.log(data && data.length > 0)

          if (data && data.length > 0) {
            for (const message of data) {
              try {
                // AsyncStorageに保存
              //   const storageKey = `${props.roomID}-${message.sendAt}`;
              //   await AsyncStorage.setItem(storageKey, JSON.stringify(message));
                //setGetmessageArray(data.messages)
                console.log(30)
                // Firestoreから削除
                //sortMessageArray(data.messages)
                await updateDoc(docRef, {
                  messages: arrayRemove(message)
                });
              } catch (error) {
                console.error("Error saving message to AsyncStorage or deleting from Firestore:", error);
              }
            }
          }
        }
      });
    }

    // コンポーネントのクリーンアップ時にリスナーを解除
    return () => {
      unsubscribe;
      console.log("unsubscribe");
    };
  }, [props.roomID, props.myID]);

  useEffect(()=>{

  },[])

  const sortMessageArray = (messageArray) => {
    // displayMessageArrayのコピーを作成し、新しいメッセージオブジェクトを追加
    const displayMessageCloneArray = displayMessageArray.concat(messageObject);

    // 追加後の配列を表示
    console.log(displayMessageCloneArray);

    // sendAtフィールドで降順に並び替え
    displayMessageCloneArray.sort(
      (a, b) => new Date(b.sendAt) - new Date(a.sendAt)
    );

    // 並び替え後の配列を表示
    console.log("displayMessageCloneArray");
    console.log(displayMessageCloneArray);
    displayMessageArray = displayMessageCloneArray;

    // 新しい配列をセット
    //setDisplayMessageArray(displayMessageCloneArray);
  };

  return (
    <View>
      <Text>{JSON.stringify(displayMessageArray.map((message)=>message.message))}</Text>
    </View>
  );
};

export default MessageListContainer;
