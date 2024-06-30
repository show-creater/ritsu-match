import React, {useEffect, useState, useRef} from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { useHome } from '../../component/context/HomeContext'
import { auth,db,storage } from '../../../firebaseConfig';
import { arrayUnion, updateDoc, Timestamp, onSnapshot, orderBy, addDoc, doc, getDoc, setDoc , collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { TouchableOpacity } from 'react-native';
import Friends from './Friends';

const Talk = ({ navigation }) => {
    const {isLogin, setIsLogin, talkPage, setTalkPage}=useHome();
    const windowWidth = Dimensions.get('window').width;
    const a = 0;
    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (talkPage && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: true });
        }
        //     scrollViewRef.current.scrollTo({ x: 1000, animated: true });
        // }
    },[talkPage]);

    // useEffect(()=>{
    //     if(isLogin){
    //         const currentuserid = auth.currentUser.uid;
    //         const TalkRoomQuery = query(collection(db, 'chat'), where("userid", "array-contains", currentuserid),orderBy("creationTime", "desc"));
    //         const unsubscribe = onSnapshot(TalkRoomQuery, (querySnapShot) => {

    //         });
    //         return () => unsubscribe();
    //     }
    // },[]);


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
        personlist: {
            width: '100%',
            height: 16000,
            marginTop: '45%',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: 900,
            // backgroundColor: 'red'
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        personInfo: {
            width: windowWidth,
            justifyContent: 'flex-start',
            borderTopWidth: 1,
            borderTopColor: 'silver',
            flexDirection: 'row',
            paddingLeft: '2%',
            alignItems: 'center',
            paddingVertical: '4%',
            // backgroundColor: 'red'
        },
        buttonContainer: {
            width: '100%',
            justifyContent: 'space-around',
            paddingHorizontal: '1%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: '4%',
        },
        TalkButton: {
            height: '100%',
            width: '40%',
            alignItems: 'center',
            marginVertical: '1%',
            borderRadius: 10,
            backgroundColor: talkPage  ? '#30CB89' : 'gray',
        },
        MatchingButton: {
            height: '100%',
            width: '40%',
            alignItems: 'center',
            marginVertical: '1%',
            borderRadius: 10,
            backgroundColor: talkPage  ? 'gray' : '#30CB89',
        },

    });
    return (
        //ヘッダー
        <View style={{ flex: 1, alignItems: 'center', height: 1000 }}>
            {/* <View style={styles.header}>
                <View style={styles.icon}></View>
                <View style={styles.informations}>
                    <View style={styles.NameHeart}>
                        <Text style={{ fontSize: 20, color: '#30CB89' }}>{'山田太郎'}</Text>
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
                            <Text style={{ fontSize: 16, color: '#30CB89' }}>{'薬学部'}</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: '#30CB89' }}>{'2日 12:05'}</Text>
                    </View>
                </View>
            </View> */}

            {/* <ScrollView style={{ width: '100%' }}>
                <View style={styles.personlist}> */}
                    {/* <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.TalkButton} onPress={()=>{setTalkPage(true)}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>トーク</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.MatchingButton} onPress={()=>{setTalkPage(false)}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>マッチング</Text>
                        </TouchableOpacity>
                    </View> */}
                    <ScrollView pagingEnabled={true} horizontal={true} ref={scrollViewRef} style={{width: windowWidth, paddingTop: '10%'}}>
                        <View style={{width: windowWidth}}>
                            <View style={styles.personInfo}>
                                <View style={{paddingRight: '2%'}}>
                                    <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                                </View>
                                <Text className="text-xl">ディカプリオ</Text>
                            </View>
                            <View style={styles.personInfo}>
                                <View style={{paddingRight: '2%'}}>
                                    <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                                </View>
                                <Text style={{fontSize: 20}}>ディカプリオ</Text>
                            </View>
                            <View style={styles.personInfo}>
                                <View style={{paddingRight: '2%'}}>
                                    <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                                </View>
                                <Text style={{fontSize: 20}}>ディカプリオ</Text>
                            </View>
                            <View style={styles.personInfo}>
                                <View style={{paddingRight: '2%'}}>
                                    <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                                </View>
                                <Text style={{fontSize: 20}}>ディカプリオ</Text>
                            </View>
                            <View style={styles.personInfo}>
                                <View style={{paddingRight: '2%'}}>
                                    <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                                </View>
                                <Text style={{fontSize: 20}}>ディカプリオ</Text>
                            </View>
                            <View style={styles.personInfo}>
                                <View style={{paddingRight: '2%'}}>
                                    <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                                </View>
                                <Text style={{fontSize: 20}}>ディカプリオ</Text>
                            </View>
                            <View style={styles.personInfo}>
                                <View style={{paddingRight: '2%'}}>
                                    <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                                </View>
                                <Text style={{fontSize: 20}}>ディカプリオ</Text>
                            </View>                        
                        </View>
                        {/* <Friends navigation={navigation}/> */}
                    </ScrollView>
                {/* </View> */}
            {/* </ScrollView> */}
            {/* <View style={styles.footer}>
                <HomeFooter navigation={navigation} />
            </View> */}
        </View>
    )
};
export default Talk;
