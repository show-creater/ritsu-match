import { View, Text ,ScrollView} from "react-native";
import React, { useEffect, useState } from "react";

const MessageListItem = (props) => {
  const [isMyMessage, setIsMyMessage] = useState<boolean>();

  useEffect(() => {
    if (!props.messageObject.id || !props.myID) return;
    setIsMyMessage(props.messageObject.sendUser == props.myID);
  },[props.messageObject.sendUser , props.myID]);
console.log(props.messageObject)
  return (
<View className={`h-12 ${isMyMessage ? "flex-row-reverse" : "flex-row"}`}>
      {isMyMessage ? (
        <View
        className="my-2 h-8 bg-[#30CB89] justify-center rounded-xl px-2 flex-grow-0"
      >
        <Text className="color-white">{props.messageObject.message}</Text>
      </View>
      ) : (
        <View
          className="my-2 h-8 bg-gray-300 justify-center rounded-xl px-2 flex-grow-0"
        >
          <Text className="">{props.messageObject.message}</Text>
        </View>
      )}
    </View>
  );
};

export default MessageListItem;
