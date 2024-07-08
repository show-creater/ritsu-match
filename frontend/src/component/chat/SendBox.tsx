import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';

const SendBox = (props) => {
    const [inputText,setInputText]=useState("")
  return (
    <View style={{backgroundColor:'#30CB89',height:60,flexDirection:'row',alignItems:'center',paddingHorizontal:20}}>
        <TextInput style={{flex:1,backgroundColor:'white',marginLeft:30,marginRight:10,height:35,borderRadius:17,paddingHorizontal:10}} onChangeText={(text)=>setInputText(text)}/>
        <TouchableOpacity onPress={()=>props.sendMessage(inputText)}>
        <Feather name="send" size={35} color="white" />
        </TouchableOpacity>
    </View>
  )
}

export default SendBox