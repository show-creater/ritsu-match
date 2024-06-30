import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { useHome } from '../../component/context/HomeContext'
import { auth, db, storage } from '../../../firebaseConfig';
import { arrayUnion, updateDoc, Timestamp, onSnapshot, orderBy, addDoc, doc, getDoc, setDoc, collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { TouchableOpacity } from 'react-native';

const MyPageImageHeader = () => {
    const { isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, isTime, setIsTime, myPageNow, setMyPageNow } = useHome();
    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            height: 100,
            alignItems: 'center',
            // justifyContent: 'space-between',
            // position: 'absolute',
            width: '100%',
            top: 0,
            zIndex: 1,
            // backgroundColor: 'red'
            // backgroundColor: 'white'
        },
    });
    useEffect(() => {
        console.log(myPageNow);
    }, [myPageNow]);

    return (
        <View style={styles.header}>
            {!myPageNow ?
                <TouchableOpacity style={{ marginLeft: 10, left: '0%', position: 'absolute', bottom: '20%' }} onPress={() => setMyPageNow(true)}>
                    <Ionicons name="chevron-back" size={30} color='#30CB89' />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ marginRight: 10, right: '0%', position: 'absolute', bottom: '20%' }}>
                    <Ionicons name="menu-sharp" size={30} color='#30CB89' />
                </TouchableOpacity>}
        </View>
    )
};
export default MyPageImageHeader;