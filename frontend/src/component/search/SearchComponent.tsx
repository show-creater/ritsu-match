import React, { useEffect, useState, useRef } from 'react';
import { TextInput, Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { useHome } from '../../component/context/HomeContext'
import { auth, db, storage } from '../../../firebaseConfig';
import { arrayUnion, updateDoc, Timestamp, onSnapshot, orderBy, addDoc, doc, getDoc, setDoc, collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { TouchableOpacity } from 'react-native';
import HomeHeader from '../../component/header/HomeHeader';
import { FontAwesome } from '@expo/vector-icons';

const SearchComponent = ({ navigation, information }) => {
    const { isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, infor, setInfor, userImage, setUserImage } = useHome();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const a = 0;
    const scrollViewRef = useRef(null);
    const [scrollX, setScrollX] = useState(true);
    const [search, setSearch] = useState('');


    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            // margin: 10,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: 'gray',
            height: '32%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            backgroundColor: 'white',
            zIndex: 1,
            marginBottom: '3%'
            // padding: 10
        },
        icon: {
            backgroundColor: 'black',
            borderRadius: 100,
            height: 60,
            width: 60,
            marginLeft: 20,
            marginRight: 10
        },
        informations: {
            flexDirection: 'column',
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center'
        },
        NameHeart: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            paddingLeft: '5%',
            paddingBottom: 5

        },
        FucilityDate: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
            paddingLeft: '3%'
        },

    });
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
                        <Text style={{ fontSize: 20, color: '#30CB89' }}>{`${information.name}`}</Text>
                    </View>
                    <View style={styles.FucilityDate}>
                        <View style={{ flexDirection: 'row' }}>
                            {information.hobby && information.hobby.map((data)=><View>
                                <View style={{borderRadius: 20, backgroundColor: 'gray', paddingVertical: '7%', paddingHorizontal: '9%', justifyContent: 'center', alignItems: 'center', marginRight: '6%', height: '60%'}}>
                                    <Text style={{ fontSize: 16, color: 'white', backgroundColor: 'red' }}>{`${data}`}</Text>
                                </View>
                            </View>)}
                        </View>
                    </View>
                </View>
            </View>
    )
};
export default SearchComponent;