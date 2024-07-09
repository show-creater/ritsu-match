import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword, browserLocalPersistence } from 'firebase/auth';
import { useHome } from '../../component/context/HomeContext'
import { collection, getDocs, getDoc, doc, setDoc, where, query, limit, QuerySnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import LottieView from 'lottie-react-native';
<<<<<<< HEAD
import HomeAnimation from '../../component/animation/HomeAnimation';
import HomeHeader from '../../component/header/HomeHeader';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import LoadDoc from '../../component/function/LoadDoc';
=======
>>>>>>> 9f73e43 (設定画面)

const HomeView = ({ navigation }) => {
    const { isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, infor, setInfor, userImage, setUserImage, persondata, setPersondata, scrollcheck, setScrollcheck } = useHome();
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    // const [persondata, setPersondata] = useState([{ name: '', faculty: '', heart: '', image: '', age: 0, comment: '', heart_pushed: [], userid: '', randomField: '' }]);
    const [heartTF, setHeartTF] = useState([]);
<<<<<<< HEAD
    const [heartnum, setHeartnum] = useState([0]);
    const scrollViewRef = useRef(null);
    const storage = getStorage();
=======
    const [heartnum, setHeartnum] = useState([]);
>>>>>>> 9f73e43 (設定画面)
    const a = 0;

    const getImage = async () => {
        const storageRef = ref(storage, `user_image/${auth.currentUser.uid}`);
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Download URL:', downloadURL);
        setUserImage(downloadURL);
        return downloadURL;
    };

    useEffect(() => {
        const loademail = async () => { //ローカルのログイン情報から自動ログイン
            let useremail = '';
            try {
                const stringValue = await AsyncStorage.getItem('useremail');
                if (stringValue != null) {
                    const value = JSON.parse(stringValue);
                    //console.log('email');
                    useremail = value;
                }
            } catch (e) {
                console.log(e);
            }
            return useremail;
        };
        const loadpassword = async () => {
            let userpassword = '';
            try {
                const stringValue = await AsyncStorage.getItem('userpassword');
                if (stringValue != null) {
                    const value = JSON.parse(stringValue);
                    //console.log('password');
                    userpassword = value;
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
                if (user.emailVerified) {
                    setIsLogin(true);
                    setLoginUser(user);
                    const image = await getImage();
                    console.log(image, 'image画像を表示します');
                    setUserImage(image);
                    const docdata = await getDoc(doc(db, "users", auth.currentUser.uid));
<<<<<<< HEAD
                    // console.log(docdata.data());
                    // console.log('hellllo');
                    if (docdata.data() != undefined) {
=======
                    //console.log(docdata.data());
                    //console.log('hellllo');
                    if (docdata().data() != undefined) {
>>>>>>> 9f73e43 (設定画面)
                        setInfor(docdata.data());
                    }
                }

                // ログインが成功した場合の処理
                // console.log('User logged in:', user);
                // console.log('User logged in:', user);
            } catch (error) {
                // エラー処理
                //   console.error('Login failed:', error.message);
                setIsTimeout(true);
            }
        };
        const login = async () => {
            let usemail = '';
            let uspassword = '';
            usemail = await loademail();
            uspassword = await loadpassword();
            handleLogin(usemail, uspassword);
        };
        login();
    }, []);

<<<<<<< HEAD
    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const isBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

        if (isBottom && !scrollcheck) {//一番下までスクロールをしたらスクロールチェックをtrueにする
            console.log('Reached the bottom!');
            LoadDoc({persondata, setPersondata, setScrollcheck, isLogin});
            setScrollcheck(true);
            
        }
    };

=======
    //     getDocs(collection(db, "matching")).forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    const test = async () => {
        const getDocument = () => {
            const usercollection = collection(db, "users");
            const randomNum = Math.random();
            const q = query(usercollection, where('randomField', '<=', randomNum), where('randomField', '>=', randomNum - 0.1), limit(1));
            //console.log(randomNum);
            return getDocs(q)
        };
        let persons = []
        getDocument().then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then((querySnapShot) => {
            //console.log(1);
            querySnapShot.forEach((doc) => {
                //console.log(doc.data());
                persons.push(doc.data());
            })
            return getDocument();
        }).then(() => {
            //console.log('hellooooo')
            //console.log(persons);
            setPersondata(persons);
        })

    };

    useEffect(() => {
        test()
        //console.log(persondata);
    }, []);

    // const makedoc = async() =>{
    //     const currentuser = auth.currentUser.uid;
    //     const randomNum=Math.random();
    //     try {
    //         await setDoc(doc(db, 'users', `${randomNum}`), {randomField: randomNum, userid: randomNum, name: `${randomNum}`, age: 0, comment: '', faculty: '', heart: 0, image: ''})
    //         console.log('起動中');
    //     }catch(e){
    //         console.log(e);
    //     }

    // };

    // const [number,setNumber] = useState(3);
    // useEffect(()=>{
    //     setNumber(5)
    //     console.log(number);
    // },[]);

    // useEffect(()=>{
    //     const docRef = doc(db, "users", "LkW4tsYgDrVi6KTAv8iEGhtuzkB3");
    //     const docSnap = async () =>{
    //         const docdata = await getDoc(docRef);
    //         //console.log(docdata.data());
    //         // setInfor(docdata.data());
    //     };
    //     docSnap();
    // },[]);

>>>>>>> 9f73e43 (設定画面)
    const heartP = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        return users;
    };

    const heartadd = async (index) => {
        let usersIDarray = [];
        let heartwhite = [];
        for (let i = 0; i < persondata.length; i++) {
            usersIDarray[i] = persondata[i];
        }
        console.log(`helloooo${usersIDarray[index].heart_pushed}`);
        usersIDarray[index].heart_pushed.push(auth.currentUser.uid);
        setHeartTF((prev) => {
            const newarray = [...prev]
            newarray[index] = true;
            return newarray;
        })
        setHeartnum((prev) => {
            const newarray = [...prev]
            newarray[index] += 1;
            return newarray;
        })
        await setDoc(doc(collection(db, 'users'), `${usersIDarray[index].userid}`), {
            age: usersIDarray[index].age,
            comment: usersIDarray[index].comment,
            faculty: usersIDarray[index].faculty,
            heart: usersIDarray[index].heart,
            image: usersIDarray[index].image,
            name: usersIDarray[index].name,
            randomField: usersIDarray[index].randomField,
            userid: usersIDarray[index].userid,
            heart_pushed: usersIDarray[index].heart_pushed
        });
        // console.log('userIDarraya');
        // console.log(usersIDarray);

    };


    const heartdelete = async (index1) => {
        let usersIDarray = [];
        for (let i = 0; i < persondata.length; i++) {
            usersIDarray[i] = persondata[i];
        }
        usersIDarray[index1].heart_pushed.forEach((item, index) => {
            if (item == `${auth.currentUser.uid}`) {
                usersIDarray[index1].heart_pushed.splice(index, 1);
            }
        });
        setHeartTF((prev) => {
            const newarray = [...prev]
            newarray[index1] = false;
            return newarray;
        })
        setHeartnum((prev) => {
            const newarray = [...prev]
            newarray[index1] -= 1;
            return newarray;
        })
        await setDoc(doc(collection(db, 'users'), `${usersIDarray[index1].userid}`), {
            age: usersIDarray[index1].age,
            comment: usersIDarray[index1].comment,
            faculty: usersIDarray[index1].faculty,
            heart: usersIDarray[index1].heart,
            image: usersIDarray[index1].image,
            name: usersIDarray[index1].name,
            randomField: usersIDarray[index1].randomField,
            userid: usersIDarray[index1].userid,
            heart_pushed: usersIDarray[index1].heart_pushed
        });
    };

    const heartcheck = () => {
        try {
           // let heartTFarray = []
            let heart = []
            let heartnumber = []
            for (let i = 0; i < persondata.length; i++) {
                heart[i] = persondata[i].heart_pushed;
                heartnumber[i] = heart[i].length;
            }
<<<<<<< HEAD
            // console.log(heart);
=======
            //console.log(heart);
>>>>>>> 9f73e43 (設定画面)
            // for (let i = 0; i < heart.length; i++) {
            //     if (heart[i].indexOf(`${auth.currentUser.uid}`) < 0) {
            //         heartTFarray[i] = false;
            //     } else {
            //         heartTFarray[i] = true;
            //     }
            // }
            setHeartTF(heart.map(item => item.includes(auth.currentUser.uid)));

<<<<<<< HEAD
            // console.log('っっっっっっっっっっっ');
            // console.log(heart);
=======
            //console.log('っっっっっっっっっっっ');
            //console.log(heart);
>>>>>>> 9f73e43 (設定画面)
            // console.log(heartTFarray);
            // setHeartTF(heartTFarray);
            setHeartnum(heartnumber);
        } catch (e) {
            console.log(e.message);
        }
    };
    useEffect(() => {
        heartP().then((result) => {
            // console.log(result);
            console.log('セットしました')
            setPersondata(result);
        })

        //console.log(persondata)
        //console.log(heartcheck(index));

    }, []);

    useEffect(() => {
        if (persondata.length > 1) {
            heartcheck();
        }
    }, [persondata])

    const styles = StyleSheet.create({
        personlist: {
            width: '100%',
            height: 16000,//?個分の高さk
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
<<<<<<< HEAD
            <HomeHeader/>
            <ScrollView style={{ width: '100%' }} pagingEnabled={true} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={1000}>
=======
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
>>>>>>> 9f73e43 (設定画面)
                <View style={styles.personlist}>
                    {persondata.map((data, index) =>
                        <View style={styles.InfoOutside} key={index}>
                            <View style={styles.personInformation}>
                                {/* <ScrollView pagingEnabled={true} horizontal={true} ref={scrollViewRef} style={{width: windowWidth}} scrollEventThrottle={16} > */}
                                    <View style={styles.personImage}>
                                        <Image style={{ width: '100%', height: '100%', borderRadius: 20, zIndex: -1 }}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                        />                                        
                                    </View>
                                {/* </ScrollView> */}
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

                                            {heartTF[index] == true ?
                                                <TouchableOpacity style={styles.clickheart} onPress={() => { heartdelete(index); }}>
                                                    <Ionicons name="heart" size={50} color="deeppink" />
                                                    <Text style={{ color: 'deeppink' }}>{`${heartnum[index]}`}</Text>
                                                </TouchableOpacity> :
                                                <TouchableOpacity style={styles.clickheart} onPress={() => { heartadd(index); }}>
                                                    <Ionicons name="heart-outline" size={50} color="deeppink" />
                                                    <Text style={{ color: 'deeppink' }}>{`${heartnum[index]}`}</Text>
                                                </TouchableOpacity>}
                                            <Ionicons name="bookmark" size={50} color="#30CB89" />

                                        </View>
                                    </View>
                                    <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>{`${data.comment}`}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
<<<<<<< HEAD
                {scrollcheck &&<HomeAnimation/>}
=======
>>>>>>> 9f73e43 (設定画面)
            <View style={styles.footer}>
                <HomeFooter navigation={navigation} />
            </View>
        </View>
    )
};
export default HomeView;
