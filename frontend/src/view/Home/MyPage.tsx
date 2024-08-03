import React, { useRef, useEffect, useState } from 'react';
import { Alert, Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { Animated, PanResponder } from 'react-native';
import { useHome } from '../../component/context/HomeContext';
import SignUpScreen from '../login/SignUpScreen';
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from '../../../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';
import MyPageImageHeader from '../../component/header/MyPageImageHeader';
import { launchImageLibrary } from 'react-native-image-picker';
import * as Imagepicker from 'expo-image-picker';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import ImagePicker from 'react-native-image-crop-picker';
import RNWebp from 'react-native-webp';
import { Feather } from '@expo/vector-icons';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeAnimation from '../../component/animation/HomeAnimation';


const MyPage = ({ navigation }) => {
    const { scrollCheck, setScrollCheck, isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, isTime, setIsTime, myPageNow, setMyPageNow, infor, setInfor, userImage, setUserImage } = useHome();
    const [changeInfor, setChangeInfor] = useState([false, false, false, false, false, false, false, false, false]);
    const [datachange, setDatachange] = useState(true);
    const [hobbyArray, setHobbyArray] = useState(['映画館', 'ツーリング', '筋トレ', 'apex', 'アニメ', 'ワンピース', 'バスケ', 'サッカー', 'タバコ', 'シーシャ', '小説', '漫画']);
    const storage = getStorage();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const pan = useRef(new Animated.ValueXY()).current;
    const [search, setSearch] = useState('');

    // PanResponderを設定し、ユーザーのドラッグ操作を管理する
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
            [null, { dx: pan.x, dy: pan.y }], // ドラッグによる位置の変更をpanに直接反映
            { useNativeDriver: false }
        ),
        onPanResponderRelease: () => {
            // ドラッグ終了時にアニメーションで元の位置に戻す
            Animated.spring(pan, {
                toValue: { x: 0, y: 100 },
                useNativeDriver: false
            }).start();
        }
    });

    const getImage = async () => {
        const storageRef = ref(storage, `user_image/${auth.currentUser.uid}`);
        const downloadURL = await getDownloadURL(storageRef);
        console.log('Download URL:', downloadURL);
        setUserImage(downloadURL);
        return downloadURL;
    };

    useEffect(() => {
        if (infor.userid != ''){
            const newArray = hobbyArray.filter(element => !infor.hobbys.includes(element));
            setHobbyArray(newArray);            
        }
    }, [infor]);

    // useEffect(() => {
    //     if (isLogin) {
    //         const currentuser = auth.currentUser.uid;
    //         setLoginUser(currentuser);
    //         const docSnap = async () => {
    //             const docdata = await getDoc(doc(db, "users", currentuser));
    //             console.log('docdataの中身');
    //             console.log(docdata.data());
    //             if (docdata.data() != undefined) {
    //                 setInfor(docdata.data());
    //                 let image = await getImage();
    //                 console.log(image, 'getimage');

    //             }
    //         };
    //         docSnap();
    //     }

    // }, []);

    const changeInformation = (i) => {
        setChangeInfor(() => {
            const array = [...changeInfor]
            array[i] = !array[i]
            return array;
        })
    };

    const pickImage = async () => {
        try {
            if (isLogin) {
                let result = await Imagepicker.launchImageLibraryAsync({
                    mediaTypes: Imagepicker.MediaTypeOptions.All,
                    aspect: [4, 3],
                    quality: -10,
                });

                if (!result.canceled) {
                    console.log(result, 'resultそのもの');
                    console.log(result.assets[0].uri, 'uri表示');
                    const imageBlob = await fetch(result.assets[0].uri).then(response => response.blob());

                    const metadata = {
                        contentType: 'image/webp', // アップロードするデータのコンテンツタイプ
                    };
                    const storageRef = ref(storage, `user_image/${auth.currentUser.uid}`);
                    console.log('upload開始');
                    await uploadBytes(storageRef, imageBlob, metadata);
                    console.log('Image uploaded successfully!');
                    await getImage();
                }
            }
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    };

    const handleDeleteImage = async () => {
        // 画像を削除する前に確認のダイアログを表示
        Alert.alert(
            '画像を削除しますか？',
            'この操作は取り消せません。',
            [
                { text: 'キャンセル', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: '削除', onPress: () => console.log('helllllllll') }
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        const adjustProfile = async () => {
            if (!datachange) {
                try {
                    if (isLogin) {
                        console.log('プロフィール変更');
                        console.log(infor);
                        console.log(auth.currentUser.uid);
                        await setDoc(doc(collection(db, 'users'), `${auth.currentUser.uid}`), {
                            name: infor.name,
                            age: infor.age,
                            comment: infor.comment,
                            faculty: infor.faculty,
                            heart_pushed: infor.heart_pushed,
                            image: infor.image,
                            randomField: infor.randomField,
                            userid: infor.userid,
                            hobbys: infor.hobbys
                        })
                    }
                } catch (e) {
                    console.log(e.message);
                }

            }
        };
        adjustProfile();

    }, [datachange]);

    const styles = StyleSheet.create({
        body: {
            flexDirection: 'column',
            flex: 1,
            // height: 4000
            //
        },

        imageContainer: {
            overflow: 'hidden',
            height: '30%',
            width: '100%',
            display: 'flex',
            // alignItems: 'center',
            position: 'relative',
            alignItems: 'center',
        },
        image: {
            width: '100%',
        },
        bodyBottom: {

        },
        footer: {
            position: 'absolute',
            bottom: 0,
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        profile: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: 0.5,
            borderRadius: 30
        },
        nameInfor: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: '5%'
        },
        fucility: {
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: '5%',
            borderBottomWidth: 1,
            borderBottomColor: '#CCCCCC',
            width: '100%'
        },
        profileInfo: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: '7%',
            borderBottomColor: '#CCCCCC',
            borderBottomWidth: 1,
            paddingHorizontal: '2%'
        },
        profileText: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        profileStatus: {
            fontSize: 18
        },
        choosenhobbyname: {
            color: 'white',
            paddingRight: '1%',
            fontWeight: 'bold'
        },
        choosenhobby: {
            borderRadius: 30,
            padding: '2%',
            margin: '1%',
            backgroundColor: '#30CB89',
            paddingHorizontal: '3%',
            flexDirection: 'row'
        },
        hobby: {
            borderRadius: 30,
            padding: '2%',
            margin: '1%',
            backgroundColor: 'gray',
            paddingHorizontal: '3%',
            alignItems: 'center',
        },
        hobbyname: {
            color: 'white',
            fontWeight: 'bold'
        },
        fieldContainer: {
            flexDirection: 'row',
            marginVertical: '10%',
            paddingVertical: '0.3%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 20,
            width: '90%',
            paddingHorizontal: '2%',
        },
    });
    return (
        <View style={styles.body}>
            {isLogin && <MyPageImageHeader />}
            {infor.userid != '' ? //ログインしてたらマイページを表示
                <ScrollView style={{ width: '100%', height: '100%' }}>
                    {/* <View style={{width: '100%', height: '5%', justifyContent: 'center', alignItems: 'space-between', paddingRight: '3%',}}>
                        <TouchableOpacity onPress={()=>{console.log('heooo')}}>
                            <Ionicons name="ellipsis-horizontal-outline" size={30} color="black" />                                
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.imageContainer}>
                        <View style={{ backgroundColor: 'transparent', top: '5%', right: 0, zIndex: 1000000, alignItems: 'space-between', position: 'absolute', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { pickImage(); }}>
                                <MaterialIcons name="photo-library" size={30} color='#30CB89' style={{ right: 5, backgroundColor: 'transparent', }} />
                            </TouchableOpacity>
                        </View>
                        {userImage != '' ? <Image style={{ width: windowWidth, height: windowHeight, top: '-40%' }}
                            source={{ uri: userImage }}
                            resizeMode='contain'
                        /> :
                            <Image style={{ width: windowWidth, height: windowHeight, top: '-40%' }}
                                source={require('../../component/photo/初期画像.jpg')}
                                resizeMode='contain'
                            />
                        }
                    </View>
                    {/* こんにちは */}
                    <View style={styles.profile}>
                        <View style={styles.nameInfor}>
                            {!changeInfor[0] ?
                                <Text style={{ fontSize: 35, color: '#30CB89' }}>{`${infor.name}`}</Text>
                                : <TextInput style={{ fontSize: 35, color: '#30CB89' }} onChangeText={(text) => { setInfor((prev) => { prev.name = text; return prev }) }} onSubmitEditing={() => { Keyboard.dismiss(); }} placeholder={`${infor.name}`}></TextInput>
                            }
                            {!changeInfor[0] ?
                                <TouchableOpacity onPress={() => { changeInformation(0); console.log(isTimeout); console.log(isTime); setDatachange(true); }}>
                                    <Ionicons name="pencil" size={24} color='#595959' />
                                </TouchableOpacity>
                                : <TouchableOpacity onPress={() => { changeInformation(0); console.log('終了'); console.log(isTime); setDatachange(false); }}>
                                    <Ionicons name="checkmark-circle-outline" size={24} color="red" />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.fucility}>
                            {/* <Text style={{fontSize: 25, color: '#30CB89'}}>{`${infor.faculty}`}</Text>
                            <TouchableOpacity>
                            <Ionicons name="pencil" size={24} color='#595959' />
                            </TouchableOpacity> */}
                            {!changeInfor[1] ?
                                <Text style={{ fontSize: 35, color: '#30CB89' }}>{`${infor.faculty}`}</Text>
                                : <TextInput style={{ fontSize: 35, color: '#30CB89' }} onChangeText={(text) => { setInfor((prev) => { prev.faculty = text; return prev }) }} onSubmitEditing={() => { Keyboard.dismiss(); }} placeholder={`${infor.faculty}`}></TextInput>
                            }
                            {!changeInfor[1] ?
                                <TouchableOpacity onPress={() => { changeInformation(1); console.log(isTimeout); console.log(isTime); setDatachange(true); }}>
                                    <Ionicons name="pencil" size={24} color='#595959' />
                                </TouchableOpacity>
                                : <TouchableOpacity onPress={() => { changeInformation(1); console.log('終了'); console.log(isTime); setDatachange(false); }}>
                                    <Ionicons name="checkmark-circle-outline" size={24} color="red" />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>趣味</Text>
                            {!changeInfor[3] ?
                                <View style={{ width: '80%', flexWrap: 'wrap', flexDirection: 'row', }}>
                                    {infor.hobbys.map((hobby, index) =>
                                        <View style={styles.choosenhobby} key={index}>
                                            <Text style={styles.choosenhobbyname}>{`${hobby}`}</Text>
                                        </View>
                                    )}
                                </View> :
                                <View style={{ flexDirection: 'column', width: '80%', }}>
                                    <Text style={{ fontWeight: 'bold' }}>選択中</Text>
                                    <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row', }}>
                                        {infor.hobbys.map((hobby, index) =>
                                            <View style={styles.choosenhobby} key={index}>
                                                <Text style={styles.choosenhobbyname}>{`${hobby}`}</Text>
                                                <TouchableOpacity onPress={() => { setHobbyArray((prev) => [...prev, hobby]); setInfor((prev) => {prev.hobbys=prev.hobbys.filter(hob=>hob!=hobby); return prev;}); }}>
                                                    <AntDesign name="closecircle" size={20} color="white" style={{ paddingLeft: '1%' }} />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                    <View style={styles.fieldContainer}>
                                        {/* <Text style={{zIndex: 100, marginRight: '2%', backgroundColor: 'red'}}>検索</Text> */}
                                        <FontAwesome name="search" size={24} color="gray" />
                                        <TextInput
                                            style={{
                                                width: '100%',
                                                // borderWidth: 1,
                                                padding: 5,
                                                borderColor: 'gray',
                                                // backgroundColor: 'blue'
                                            }}
                                            onChangeText={setSearch}
                                            value={search}
                                            placeholder="キーワードを入力"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                    </View>
                                    <View style={{ width: '100%', flexWrap: 'wrap', flexDirection: 'row', }}>
                                        {hobbyArray.map((hob, index) =>
                                            <TouchableOpacity style={styles.hobby} onPress={() => { setHobbyArray((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]); setInfor(prev => { prev.hobbys.push(hob); return prev; }) }} key={index}>
                                                <Text style={styles.hobbyname}>{`${hob}`}</Text>
                                            </TouchableOpacity>)}
                                    </View>
                                </View>
                            }
                            {!changeInfor[3] ?
                                <TouchableOpacity onPress={() => { changeInformation(3); console.log(isTimeout); console.log(isTime); setDatachange(true); }}>
                                    <Ionicons name="pencil" size={24} color='#595959' />
                                </TouchableOpacity>
                                : <TouchableOpacity onPress={() => { changeInformation(3); console.log('終了'); console.log(isTime); setDatachange(false); }}>
                                    <Ionicons name="checkmark-circle-outline" size={24} color="red" />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>年齢</Text>
                            {!changeInfor[2] ?
                                <Text style={styles.profileStatus}>{`${infor.age}`}</Text>
                                : <TextInput style={styles.profileStatus} onChangeText={(text: number) => { setInfor((prev) => { prev.age = text; return prev }) }} onSubmitEditing={() => { Keyboard.dismiss(); }} placeholder={`${infor.age}`}></TextInput>
                            }
                            {!changeInfor[2] ?
                                <TouchableOpacity onPress={() => { changeInformation(2); console.log(isTimeout); console.log(isTime); setDatachange(true); }}>
                                    <Ionicons name="pencil" size={24} color='#595959' />
                                </TouchableOpacity>
                                : <TouchableOpacity onPress={() => { changeInformation(2); console.log('終了'); console.log(isTime); setDatachange(false); }}>
                                    <Ionicons name="checkmark-circle-outline" size={24} color="red" />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>身長</Text>
                            <Text style={styles.profileStatus}>184cm</Text>
                            <TouchableOpacity>
                                <Ionicons name="pencil" size={24} color='#595959' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>趣味</Text>
                            <Text style={styles.profileStatus}>映画鑑賞</Text>
                            <TouchableOpacity>
                                <Ionicons name="pencil" size={24} color='#595959' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>大学</Text>
                            <Text style={styles.profileStatus}>立命館大学</Text>
                            <TouchableOpacity>
                                <Ionicons name="pencil" size={24} color='#595959' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>自己紹介</Text>
                            {!changeInfor[8] ?
                                <Text style={{ fontSize: 35, color: '#30CB89' }}>{`${infor.comment}`}</Text>
                                : <TextInput style={{ fontSize: 35, color: '#30CB89' }} onChangeText={(text) => { setInfor((prev) => { prev.faculty = text; return prev }) }} onSubmitEditing={() => { Keyboard.dismiss(); }} placeholder={`${infor.comment}`}></TextInput>
                            }
                            {!changeInfor[8] ?
                                <TouchableOpacity onPress={() => { changeInformation(8); console.log(isTimeout); console.log(isTime); setDatachange(true); }}>
                                    <Ionicons name="pencil" size={24} color='#595959' />
                                </TouchableOpacity>
                                : <TouchableOpacity onPress={() => { changeInformation(8); console.log('終了'); console.log(isTime); setDatachange(false); }}>
                                    <Ionicons name="checkmark-circle-outline" size={24} color="red" />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    {/* <View style={{position:'absolute',top:50,right:20,backgroundColor:"rgba(255,255,255,0.3)",borderRadius:10}}>
                    <TouchableOpacity onPress={()=>navigation.navigate("Setting")}>
                        <Feather name="menu" size={50} color="black" />
                    </TouchableOpacity>
                </View> */}
                </ScrollView>
                :
                <View style={{ flex: 1 }}>
                    {!isTimeout && isTime ?
                        <SignUpScreen navigation={navigation} /> :
                        <HomeAnimation />}
                </View>
            }
            {isLogin && <View style={styles.footer}>
                <HomeFooter navigation={navigation} />
            </View>}
        </View>


    );
};
export default MyPage;