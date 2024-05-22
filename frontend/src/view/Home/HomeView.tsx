import React, {useEffect, useState} from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../../firebaseConfig';
import {signInWithEmailAndPassword, browserLocalPersistence} from 'firebase/auth';
import { useHome } from '../../component/context/HomeContext'
import { collection, getDocs ,getDoc,doc} from "firebase/firestore";
import { db } from '../../../firebaseConfig';

const HomeView = ({ navigation }) => {
    const {isLogin, setIsLogin, loginUser, setLoginUser}=useHome();
    const windowHeight = Dimensions.get('window').height;
    const [infor,setInfor] = useState({name: '', faculty: '', heart: 0, image:'', age: 0, comment: ''});
    const a = 0;

    
    useEffect(()=>{
        const loademail = async () => { //ローカルのログイン情報から自動ログイン
            let useremail='';
            try {
              const stringValue = await AsyncStorage.getItem('useremail');
              if(stringValue != null){
                const value = JSON.parse(stringValue);
                console.log('email');
                useremail=value;
            }
            } catch (e) {
              console.log(e);
            }
            return useremail;
          };
          const loadpassword = async () => {
            let userpassword='';
            try {
              const stringValue = await AsyncStorage.getItem('userpassword');
              if(stringValue != null){
                const value = JSON.parse(stringValue);
                console.log('password');
                userpassword=value;
            }
            } catch (e) {
              console.log(e);
            }
            return userpassword;
          };
          const handleLogin = async (email, password) => {
            try {
                // メールアドレスとパスワードでログイン
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                setIsLogin(true);
                if (user.emailVerified){
                    setIsLogin(true);
                    setLoginUser(user);
                }

                // ログインが成功した場合の処理
                console.log('User logged in:', user);
                // console.log('User logged in:', user);
            } catch (error) {
              // エラー処理
              console.error('Login failed:', error.message);
            }
          };
          const login=async()=>{
            let usemail='';
            let uspassword='';
            usemail= await loademail();
            uspassword=await loadpassword();
            handleLogin(usemail, uspassword);
          };
          login();
    },[]);

    //     getDocs(collection(db, "matching")).forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    const [persondata, setPersondata] = useState([{name: '', faculty: '', heart: '', image:'', age: 0, comment: ''}]);
        const test = async () => {
            const querySnapshot = await getDocs(collection(db, "matching"));
            let persons=[]
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(persondata);
                persons.push(doc.data());
            });
            setPersondata(persons);
        };
    useEffect(()=>{
        test()
        console.log(persondata);

    },[]);

    // const [number,setNumber] = useState(3);
    // useEffect(()=>{
    //     setNumber(5)
    //     console.log(number);
    // },[]);
        
    useEffect(()=>{
        const docRef = doc(db, "users", "LkW4tsYgDrVi6KTAv8iEGhtuzkB3");
        const docSnap = async () =>{
            const docdata = await getDoc(docRef);
            //console.log(docdata.data());
            setInfor(docdata.data());
        };
        docSnap();
    },[]);

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
            height: 16000,//?個分の高さ
            marginTop: 160,
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: 900
        },
        InfoOutside: {
            height: windowHeight,
            width: '90%'
        },
        personInformation: {
            height: '70%',
            width: '100%',
            borderRadius: 20,
            borderWidth: 1.5,
            borderColor: '#30CB89',
            flexDirection: 'column',
            backgroundColor: '#30CB89',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '0.5%'
        },
        personImage: {
            display: 'flex',
            backgroundColor: 'white',
            height: '64.5%',
            borderRadius: 20,
            width: '99%',
            marginBottom: '1%',
            flex: 1,
            justifyContent: "center",
            alignItems: 'center',
            marginTop: '0.5%',
        },
        personProfile: {
            backgroundColor: 'white',
            height: '34%',
            borderRadius: 20,
            width: '99%',
            paddingTop: '2%',
            paddingRight: '5%',
            paddingLeft: '5%',
            flexDirection: 'column'
        },
        ProfileTop: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            // height: '70%',
        },
        NameFucility: {
            flexDirection: 'column',

        },
        heartBookmark: {
            flexDirection: 'row',
        },
        clickheart: {
            flexDirection: 'column',
            alignItems: 'center'
        },
        ProfileBottom: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '60%',
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },



    });
    return (
        <View style={{ flex: 1, alignItems: 'center', height: 1000 }}>
            {/* <View><Text>{`${number}`}</Text></View> */}
            <View style={styles.header}>
                <View style={styles.icon}></View>
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
            <ScrollView style={{ width: '100%' }} pagingEnabled={true} showsVerticalScrollIndicator={false}>
                <View style={styles.personlist}>
                    {persondata.map((data,index) => 
                        <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>

                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>{`${data.name}`}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>{`${data.faculty}`}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>{`${data.heart}`}</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>{`${data.comment}`}</Text>
                            </View>
                        </View>
                    </View>
                    )}
                    {/* <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>

                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>レオナルドディカプリオ</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>fuculity</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>2</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>私がギャッツビーです</Text>
                            </View>
                        </View>
                    </View> */}
                    {/* <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>レオナルドディカプリオ</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>理工学部</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>2</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>私がギャッツビーです</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>レオナルドディカプリオ</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>理工学部</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>2</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>私がギャッツビーです</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>レオナルドディカプリオ</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>理工学部</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>2</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>私がギャッツビーです</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>レオナルドディカプリオ</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>理工学部</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>2</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>私がギャッツビーです</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>レオナルドディカプリオ</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>理工学部</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>2</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>私がギャッツビーです</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>レオナルドディカプリオ</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>理工学部</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>2</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>私がギャッツビーです</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>レオナルドディカプリオ</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>理工学部</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>2</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>私がギャッツビーです</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>レオナルドディカプリオ</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>理工学部</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>2</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>私がギャッツビーです</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.InfoOutside}>
                        <View style={styles.personInformation}>
                            <View style={styles.personImage}>
                                <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                    source={require('../../component/photo/ディカプリオ.webp')}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={styles.personProfile}>
                                <View style={styles.ProfileTop}>
                                    <View style={styles.NameFucility}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>レオナルドディカプリオ</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="pencil" size={24} color='#30CB89' />
                                            <Text style={{ fontSize: 15, color: '#30CB89' }}>理工学部</Text>
                                        </View>
                                    </View>
                                    <View style={styles.heartBookmark}>
                                        <View style={styles.clickheart}>
                                            <Ionicons name="heart-outline" size={50} color="deeppink" />
                                            <Text style={{ color: 'deeppink' }}>2</Text>
                                        </View>
                                        <Ionicons name="bookmark" size={50} color="#30CB89" />
                                    </View>
                                </View>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>私がギャッツビーです</Text>
                            </View>
                        </View>
                    </View> */}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <HomeFooter navigation={navigation} />
            </View>
        </View>
    )
};
export default HomeView;
