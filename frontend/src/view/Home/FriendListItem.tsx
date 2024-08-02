import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

export default function FriendListItem(props) {
  const windowWidth = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    containerBox: {
      width: windowWidth / 2 - 20,
      height: 270,
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
  });

  const createRoom = async () => {
    try {
      const userDocRef = doc(db, "chatData", auth.currentUser.uid);

      // friendArrayフィールドにfriendIdを追加
      await setDoc(
        userDocRef,
        {
          friendArray: arrayUnion(props.id),
        },
        { merge: true }
      );

      const friendDocRef = doc(db, "chatData", props.id);

      // friendArrayフィールドにfriendIdを追加
      await setDoc(
        friendDocRef,
        {
          friendArray: arrayUnion(auth.currentUser.uid),
        },
        { merge: true }
      );
    } catch (e) {
      console.log(e);
    }finally{
      console.log(props.id,props.name);
      props.createRoom(props.id,props.name);
    }
  };

  return (
    <View style={styles.containerBox}>
      <View style={styles.containerImg}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            zIndex: -1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          source={require("../../component/photo/ディカプリオ.webp")}
          resizeMode="cover"
        />
        {/* <View style={styles.containerTextTime}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 15 }}>
            2時間前
          </Text>
        </View> */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => navigation.navigate("Talk")}
          >
            <Entypo name="thumbs-down" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center" }}
            onPress={() => createRoom()}
          >
            <FontAwesome name="thumbs-up" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.containerTextName}>{props.name}</Text>
        <Text style={styles.containerTextInformation}>
          {props.age}歳かも？・滋賀かも？
        </Text>
      </View>
    </View>
  );
}
