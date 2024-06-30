import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { useHome } from '../../component/context/HomeContext'
import { auth, db, storage } from '../../../firebaseConfig';
import { arrayUnion, updateDoc, Timestamp, onSnapshot, orderBy, addDoc, doc, getDoc, setDoc, collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { TouchableOpacity } from 'react-native';

const HomeHeader = () => {
    const { isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, infor, setInfor, userImage, setUserImage } = useHome();
    let a = 0;
    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            margin: 10,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: '#30CB89',
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '95%',
            top: 50,
            backgroundColor: 'white',
            zIndex: 1
        },
        icon: {
            backgroundColor: 'black',
            borderRadius: 100,
            height: 60,
            width: 60,
            marginLeft: 40,
            marginRight: 10
        },
        informations: {
            flexDirection: 'column',
        },
        NameHeart: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '75%',
            paddingLeft: '5%',
            paddingBottom: 5

        },
        heart: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        heartCount: {
            backgroundColor: 'silver',
            width: '60%',
            borderRadius: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: '5%'
        },
        FucilityDate: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
            paddingLeft: '3%'
        },
    })

    return (
        <View style={styles.header}>
            <View style={styles.icon}>
                {userImage != '' && <Image style={{ zIndex: 100, borderRadius: 100, height: 60, width: 60, }}
                    source={{ uri: userImage }}
                    resizeMode='cover'
                />}
            </View>
            <View style={styles.informations}>
                <View style={styles.NameHeart}>
                    <Text style={{ fontSize: 20, color: '#30CB89' }}>{`${infor.name}`}</Text>
                    <View style={styles.heart}>
                        <Ionicons name="heart" size={24} color="deeppink" />
                        <View style={styles.heartCount}>
                            <Text style={{ fontSize: 18, paddingLeft: '10%', color: 'white' }}>{`× ${a}　`}</Text>
                            <AntDesign name="plus" size={15} color="dodgerblue" />
                        </View>
                    </View>
                </View>
                <View style={styles.FucilityDate}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name="pencil" size={24} color='#30CB89' />
                        <Text style={{ fontSize: 16, color: '#30CB89' }}>{`${infor.faculty}`}</Text>
                    </View>
                    <Text style={{ fontSize: 16, color: '#30CB89' }}>{'2日 12:05'}</Text>
                </View>
            </View>
        </View>
    )
};
export default HomeHeader;