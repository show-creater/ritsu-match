import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { useHome } from '../../component/context/HomeContext'
import { auth, db, storage } from '../../../firebaseConfig';
import { arrayUnion, updateDoc, Timestamp, onSnapshot, orderBy, addDoc, doc, getDoc, setDoc, collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { TouchableOpacity } from 'react-native';
import Friends from './Friends';
import Talk from './Talk';
import HomeHeader from '../../component/header/HomeHeader';

const UserSearch = ({ navigation }) => {
    const { isLogin, setIsLogin, talkPage, setTalkPage } = useHome();
    const windowWidth = Dimensions.get('window').width;
    const a = 0;
    const scrollViewRef = useRef(null);
    const [scrollX, setScrollX] = useState(true);

    // useEffect(() => {
    //     if (talkPage) {
    //         scrollViewRef.current.scrollTo({ x: 0, animated: true });
    //     }else{
    //         scrollViewRef.current.scrollTo({ x: 450, animated: true });
    //     }
    //     console.log(talkPage);
    // },[talkPage]);

    // useEffect(() => {
    //     if(scrollViewRef.current.scrollTo.x >= windowWidth/2){
    //         setTalkPage(true);
    //     }else{
    //         setTalkPage(false);
    //     }
    // })

    useEffect(() => {
        console.log(scrollViewRef.current.scrollTo);

    }, [scrollViewRef])

    // useEffect(()=>{
    //     if(isLogin){
    //         const currentuserid = auth.currentUser.uid;
    //         const TalkRoomQuery = query(collection(db, 'chat'), where("userid", "array-contains", currentuserid),orderBy("creationTime", "desc"));
    //         const unsubscribe = onSnapshot(TalkRoomQuery, (querySnapShot) => {

    //         });
    //         return () => unsubscribe();
    //     }
    // },[]);

    const handleScroll = (event) => {
        const x = event.nativeEvent.contentOffset.x;
        if (x > 225) {
            setScrollX(false);
            console.log('false');
        } else if (x < 225) {
            setScrollX(true);
            console.log('true');
        }
        // console.log('hello');
    };


    const styles = StyleSheet.create({
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
            backgroundColor: (talkPage && scrollX) ? '#30CB89' : 'gray',
        },
        MatchingButton: {
            height: '100%',
            width: '40%',
            alignItems: 'center',
            marginVertical: '1%',
            borderRadius: 10,
            backgroundColor: (talkPage && scrollX) ? 'gray' : '#30CB89',
        },

    });
    return (
        //ヘッダー
        <View style={{ flex: 1, alignItems: 'center', height: 1000 }}>
            <HomeHeader />
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.personlist}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.TalkButton} onPress={() => { setTalkPage(true); scrollViewRef.current.scrollTo({ x: 0, animated: true }); }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>トーク</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.MatchingButton} onPress={() => { setTalkPage(false); scrollViewRef.current.scrollTo({ x: 450, animated: true }); }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>マッチング</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView pagingEnabled={true} horizontal={true} ref={scrollViewRef} style={{ width: windowWidth }} onScroll={handleScroll} scrollEventThrottle={16}>
                        <Talk navigation={navigation} />
                        <Friends navigation={navigation} />
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <HomeFooter navigation={navigation} />
            </View>
        </View>
    )
};
export default UserSearch;
