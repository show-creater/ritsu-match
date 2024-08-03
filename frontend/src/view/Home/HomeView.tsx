import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Text, View, StyleSheet, Vibration, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHome } from '../../component/context/HomeContext'
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import HomeAnimation from '../../component/animation/HomeAnimation';
import HomeHeader from '../../component/header/HomeHeader';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import LoadDoc from '../../component/function/LoadDoc';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import GoodAnimation from '../../component/animation/GoodAnimation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeView = ({ navigation }) => {
    const { isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, infor, setInfor, userImage, setUserImage, persondata, setPersondata, scrollcheck, setScrollcheck } = useHome();

    const [heartTF, setHeartTF] = useState([]);
    const [heartnum, setHeartnum] = useState(["読み込み中"]);
    const scrollViewRef = useRef(null);
    const storage = getStorage();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [good, setGood] = useState(false);
    // const [indexCount, setIndexCount] = useState(0);
    // const [heartIndex, setHeartIndex] = useState(0);

    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const currentIndexShared = useSharedValue(0);

    const updateIndex = (newIndex, type) => {
        if (type == 'right') {
            console.log('端に来たから0に戻します');
            if (!heartTF[currentIndex]) {
                setGood(true);
                heartadd(currentIndex);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }

        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
        setCurrentIndex(newIndex % persondata.length);
        x.value = 0;
        y.value = 0;
    };

    const report = async (person) => {
        try {
            Alert.alert('ユーザーの通報', 'ユーザーを通報しますか？', [
                {
                    text: 'キャンセル',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => reportDoc(person) },
            ]);
        } catch (e) {
            console.log(e.message);
        }
    };

    const reportDoc = async (person) => {
        console.log('reportDoc発火');
        try {
            await setDoc(doc(collection(db, 'report'), `${person.userid}`), {
                userid: person.userid,
                sender: auth.currentUser.uid
            });
            console.log('reportDoc完了');
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        console.log('heartAdd発火');
        const timer = setTimeout(() => {
            setGood(false);
        }, 600);
        return () => clearTimeout(timer);

    }, [good]);

    useEffect(() => {
        console.log('hello');
        const timer = setTimeout(() => {
            x.value = 0.001;
            y.value = 0.001;
        }, 7);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }, { translateY: y.value }],
    }));

    const getImage = async () => {
        const storageRef = ref(storage, `user_image/${auth.currentUser.uid}`);
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Download URL:', downloadURL);
        setUserImage(downloadURL);
        return downloadURL;
    };

    useEffect(() => {
        console.log(position);
        console.log(windowWidth);
    }, [position]);

    useEffect(() => {
        const loademail = async () => { //ローカルのログイン情報から自動ログイン
            let useremail = '';
            try {
                const stringValue = await AsyncStorage.getItem('useremail');
                if (stringValue != null) {
                    const value = JSON.parse(stringValue);
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
                    userpassword = value;
                }
            } catch (e) {
                console.log(e);
            }
            return userpassword;
        };

        const handleLogin = async (email, password) => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                if (user.emailVerified) {
                    setIsLogin(true);
                    setLoginUser(user);
                    setIsTimeout(true);
                    const image = await getImage();
                    console.log(image, 'image画像を表示します');
                    setUserImage(image);
                    const docdata = await getDoc(doc(db, "users", auth.currentUser.uid));
                    if (docdata.data() != undefined) {
                        setInfor(docdata.data());
                    }
                }
            } catch (error) {
                console.log('Login failed:', error.message);
                if (error.message == "Firebase Storage: Object 'user_image/KDdI2NJ4zYOeLWcmb23AmZSNikB2' does not exist. (storage/object-not-found)") {
                    setIsTimeout(true);
                }
            }
        };

        const login = async () => {
            let usemail = '';
            let uspassword = '';
            usemail = await loademail();
            uspassword = await loadpassword();
            handleLogin(`${usemail}`, uspassword);
        };
        login();
    }, []);

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const isBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;

        if (isBottom && !scrollcheck) {
            console.log('Reached the bottom!');
            LoadDoc({ persondata, setPersondata, setScrollcheck, isLogin });
            setScrollcheck(true);
        }
    };


  
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
        for (let i = 0; i < persondata.length; i++) {
            usersIDarray[i] = persondata[i];
        }
        console.log(usersIDarray[index].heart_pushed);
        usersIDarray[index].heart_pushed.push(auth.currentUser.uid);
        console.log(usersIDarray[index].heart_pushed);
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
            image: usersIDarray[index].image,
            name: usersIDarray[index].name,
            randomField: usersIDarray[index].randomField,
            userid: usersIDarray[index].userid,
            heart_pushed: usersIDarray[index].heart_pushed,
            hobbys: usersIDarray[index].hobbys
        });
    };

    const heartdelete = async (index1) => {
        let usersIDarray = [];
        try {
            for (let i = 0; i < persondata.length; i++) {
                usersIDarray[i] = persondata[i];
            }
            usersIDarray[index1].heart_pushed = usersIDarray[index1].heart_pushed.filter(item => item !== auth.currentUser.uid);
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
                image: usersIDarray[index1].image,
                name: usersIDarray[index1].name,
                randomField: usersIDarray[index1].randomField,
                userid: usersIDarray[index1].userid,
                heart_pushed: usersIDarray[index1].heart_pushed,
                hobbys: usersIDarray[index1].hobbys
            });
        } catch (e) {
            console.log(e.message);
        }
    };

    const heartcheck = () => {
        try {
            let heart = []
            let heartnumber = []
            for (let i = 0; i < persondata.length; i++) {
                heart[i] = persondata[i].heart_pushed;
                heartnumber[i] = heart[i].length;
            }
            setHeartTF(heart.map(item => item.includes(auth.currentUser.uid)));
            setHeartnum(heartnumber);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        heartP().then((result) => {
            setPersondata(result);
        })
    }, []);

    useEffect(() => {
        if (persondata.length > 1) {
            heartcheck();
        }
    }, [persondata]);

    useEffect(() => {
        console.log('isLogin:', isLogin);
    }, [isLogin]);

    useEffect(() => {
        console.log(currentIndex);
        if (currentIndex == 0) {
            setScrollcheck(true);
            console.log('currentIndexが上限に行きました');
            LoadDoc({ persondata, setPersondata, setScrollcheck, isLogin });
        }
    }, [currentIndex]);



    return (
       <View style={{ flex: 1 }}>
            <HomeHeader />
            {good && <GoodAnimation />}
            {scrollcheck ? <HomeAnimation /> :
                <GestureHandlerRootView style={styles.container}>
                    {persondata.map((item, index) => {
                        if (index < currentIndex) {
                            return null;
                        }

                        const isLastCard = index === currentIndex;

                        // ジェスチャーをここで定義
                        const panGesture = Gesture.Pan()
                            .onBegin(() => {
                                // 必要なら何か処理を行う
                            })
                            .onUpdate((event) => {
                                x.value = event.translationX;
                                y.value = event.translationY;
                            })
                            .onEnd((event) => {
                                if (event.translationX > windowWidth / 5) {
                                    //   x.value = withSpring(windowWidth, {}, () => {
                                    console.log('右端');
                                    runOnJS(updateIndex)(currentIndexShared.value + 1, 'right');
                                    currentIndexShared.value = currentIndexShared.value + 1;
                                    //   });
                                } else if (event.translationX < -windowWidth / 5) {
                                    //   x.value = withSpring(-windowWidth, {}, () => {
                                    console.log('左端');
                                    runOnJS(updateIndex)(currentIndexShared.value + 1, 'left');
                                    currentIndexShared.value = currentIndexShared.value + 1;
                                    //   });
                                } else {
                                    console.log('0に戻る');
                                    x.value = withSpring(0);
                                    y.value = withSpring(0);
                                }
                            });

                        return (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.card,
                                    { zIndex: persondata.length - index },
                                    isLastCard && animatedStyle,
                                ]}
                            >
                                <GestureDetector gesture={panGesture}>
                                    <Animated.View style={styles.cardContent}>
                                        <View style={[styles.InfoOutside, { transform: [{ translateX: position.x }, { translateY: position.y }], zIndex: index }]}>
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
                                                            <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 25, color: '#30CB89', width: 200, maxHeight: '55%' }}>{`${item.name}`}</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Ionicons name="pencil" size={24} color='#30CB89' />
                                                                <Text style={{ fontSize: 15, color: '#30CB89' }}>{`${item.faculty}`}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.heartBookmark}>
                                                            {heartTF[index] ?
                                                                <TouchableOpacity style={styles.clickheart} onPress={() => { heartdelete(index); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error) }}>
                                                                    <FontAwesome name="thumbs-up" size={50} color="#30CB89" />
                                                                    <Text style={{ color: 'deeppink' }}>{`${heartnum[index]}`}</Text>
                                                                </TouchableOpacity> :
                                                                <TouchableOpacity style={styles.clickheart} onPress={() => { setGood(true); heartadd(index); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); }}>
                                                                    <FontAwesome name="thumbs-o-up" size={50} color="#30CB89" />
                                                                    <Text style={{ color: 'deeppink' }}>{`${heartnum[index]}`}</Text>
                                                                </TouchableOpacity>}
                                                            <TouchableOpacity style={styles.clickheart} onPress={() => report(item)}>
                                                                <Entypo style={{ paddingLeft: '2%' }} name="circle-with-cross" size={50} color="red" />
                                                                <Text style={{ paddingLeft: '2%', color: 'red' }}>通報</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 18, width: '100%', marginTop: 10 }}>{`${item.comment}`}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Animated.View>
                                </GestureDetector>
                            </Animated.View>
                        );
                    }).reverse()}
                </GestureHandlerRootView>}
            {/* {scrollcheck && <HomeAnimation />} */}
            <View style={styles.footer}>
                <HomeFooter navigation={navigation} />
            </View>
        </View>

    );


};

const styles = StyleSheet.create({
    personlist: {
        width: '100%',
        height: windowHeight,
        marginTop: 160,
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 900
    },
    InfoOutside: {
        height: windowHeight,
        width: '90%',
        position: 'absolute',
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
        paddingBottom: '0.5%',

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
    },
    NameFucility: {
        flexDirection: 'column',
    },
    heartBookmark: {
        flexDirection: 'row',
    },
    clickheart: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue'
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
    container: {
        flex: 1,
        // // justifyContent: 'center',
        // alignItems: 'center',
    },
    card: {
        position: 'absolute',
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
        marginTop: 160,


    },
    cardContent: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default HomeView;
