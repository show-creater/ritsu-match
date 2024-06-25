import React, { useRef,useEffect, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, TextInput ,Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { Animated, PanResponder } from 'react-native';
import { useHome } from '../../component/context/HomeContext';
import SignUpScreen from '../login/SignUpScreen';
import { collection, getDocs ,getDoc ,doc, setDoc } from "firebase/firestore";
import { db, auth } from '../../../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';

const MyPage=({navigation})=>{
    const {isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, isTime, setIsTime}=useHome();
    const [changeInfor,setChangeInfor] = useState([false,false,false,false,false,false,false,false,false]);
    const [infor,setInfor] = useState({name: '', heart: 0, faculty: '', image:'', age: 0, comment: '', heart_pushed: [], randomField: 0, userid: ''});
    const [datachange, setDatachange] = useState(true);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const pan = useRef(new Animated.ValueXY()).current;

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

    useEffect(()=>{
        if (isLogin){
            const currentuser = auth.currentUser.uid;
            setLoginUser(currentuser);
            const docSnap = async () =>{
                const docdata = await getDoc(doc(db, "users", currentuser));
                console.log('docdataの中身');
                console.log(docdata.data());
                if (docdata.data() != undefined){
                    setInfor(docdata.data());
                }
            };
            docSnap();
        }


        // const dog = docSnap();

        // console.log(dog);
    //     if (dog.exists()) {
    //     console.log("Document data:", docSnap.data());
    //     } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    //     }        
    },[]);


    // const [infor, setInfor] = useState([{name: '', faculty: '', heart: '', image:'', age: '', comment: ''}]);
    //     const test = async () => {
    //         const querySnapshot = await getDocs(collection(db, "users","LkW4tsYgDrVi6KTAv8iEGhtuzkB3"));
    //         let persons=[]
    //         querySnapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             //console.log(doc.data(),",");
    //             //console.log(infor);
    //             persons.push(doc.data());

    //         });
    //         setInfor(persons);
    //     };
    // useEffect(()=>{
    //     test()
    //     console.log(infor);
    //     },[]);

    const changeInformation = (i) => {
        setChangeInfor(() => {
            const array=[...changeInfor]
            array[i]=!array[i]
            return array;
        })
    };

    useEffect(() => {
        const adjustProfile = async() => {
            if (!datachange){
                try {
                console.log('プロフィール変更');
                console.log(infor);
                console.log(auth.currentUser.uid);
                await setDoc(doc(collection(db, 'users'), `${auth.currentUser.uid}`), {
                    name: infor.name,
                    age: infor.age,
                    comment: infor.comment,
                    faculty: infor.faculty,
                    heart: infor.heart,
                    heart_pushed: infor.heart_pushed,
                    image: infor.image,
                    randomField: infor.randomField,
                    userid: infor.userid
                })
                }catch(e) {
                    console.log(e.message);
            } 

            }           
        };
        adjustProfile();

    },[datachange]);

    const styles=StyleSheet.create({
        body: {
            flexDirection: 'column',
            flex: 1,
            // height: 4000
            // backgroundColor: 'red'
        },

        imageContainer: {
            overflow: 'hidden',
            height: '30%',
            width: '100%',
            display: 'flex',
            // alignItems: 'center',
            position: 'relative',
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
            alignItems: 'center'
        },
        nameInfor:{
            flexDirection:'row',
            alignItems:'center',
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
        }
    });
    return (
            <View style={styles.body}>
                {isLogin ? //ログインしてたらマイページを表示
                <ScrollView style={{width: '100%', height: '100%'}}>
                    <View style={{width: '100%', height: '5%', justifyContent: 'center', alignItems: 'space-between', paddingRight: '3%',}}>
                        <TouchableOpacity onPress={()=>{console.log('heooo')}}>
                            <Ionicons name="ellipsis-horizontal-outline" size={30} color="black" />                                
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity style={{backgroundColor: 'transparent', top: '10%', zIndex: 1000000, alignItems: 'space-between'}} onPress={()=>{console.log('hello'); navigation.navigate('ImageSetting')}}>
                            <MaterialIcons name="photo-library" size={30} color='#30CB89' style={{right: 5, backgroundColor: 'transparent', }}/>
                        </TouchableOpacity>
                        <Image style={{ width: windowWidth, height: windowHeight}}
                            source={require('../../component/photo/ディカプリオ.webp')}
                            resizeMode='cover'
                        />
                        
                    </View>
                    <View style={styles.profile}>
                        <View style={styles.nameInfor}>
                            {!changeInfor[0] ? 
                                <Text style={{fontSize: 35, color: '#30CB89'}}>{`${infor.name}`}</Text>
                                :<TextInput style={{fontSize: 35, color: '#30CB89'}} onChangeText={(text)=>{setInfor((prev)=>{prev.name=text; return prev})}} onSubmitEditing={() => {Keyboard.dismiss();}} placeholder={`${infor.name}`}></TextInput>
                            }
                            {!changeInfor[0] ? 
                                <TouchableOpacity onPress={() => {changeInformation(0); console.log(isTimeout); console.log(isTime); setDatachange(true);}}>
                                    <Ionicons name="pencil" size={24} color='#595959' />
                                </TouchableOpacity>
                                :<TouchableOpacity onPress={() => {changeInformation(0); console.log('終了'); console.log(isTime); setDatachange(false);}}>
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
                                <Text style={{fontSize: 35, color: '#30CB89'}}>{`${infor.faculty}`}</Text>
                                :<TextInput style={{fontSize: 35, color: '#30CB89'}} onChangeText={(text)=>{setInfor((prev)=>{prev.faculty=text; return prev})}} onSubmitEditing={() => {Keyboard.dismiss();}} placeholder={`${infor.faculty}`}></TextInput>
                            }
                            {!changeInfor[1] ? 
                                <TouchableOpacity onPress={() => {changeInformation(1); console.log(isTimeout); console.log(isTime); setDatachange(true);}}>
                                    <Ionicons name="pencil" size={24} color='#595959' />
                                </TouchableOpacity>
                                :<TouchableOpacity onPress={() => {changeInformation(1); console.log('終了'); console.log(isTime); setDatachange(false);}}>
                                    <Ionicons name="checkmark-circle-outline" size={24} color="red" />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>年齢</Text>
                            {!changeInfor[2] ? 
                                <Text style={styles.profileStatus}>{`${infor.age}`}</Text>
                                :<TextInput style={styles.profileStatus} onChangeText={(text:number)=>{setInfor((prev)=>{prev.age=text; return prev})}} onSubmitEditing={() => {Keyboard.dismiss();}} placeholder={`${infor.age}`}></TextInput>
                            }
                            {!changeInfor[2] ? 
                                <TouchableOpacity onPress={() => {changeInformation(2); console.log(isTimeout); console.log(isTime); setDatachange(true);}}>
                                    <Ionicons name="pencil" size={24} color='#595959' />
                                </TouchableOpacity>
                                :<TouchableOpacity onPress={() => {changeInformation(2); console.log('終了'); console.log(isTime); setDatachange(false);}}>
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
                            <Text style={styles.profileText}>出身地</Text>
                            <Text style={styles.profileStatus}>東京都</Text>
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
                            <Text style={styles.profileText}>血液型</Text>
                            <Text style={styles.profileStatus}>B型</Text>
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
                                <Text style={{fontSize: 35, color: '#30CB89'}}>{`${infor.comment}`}</Text>
                                :<TextInput style={{fontSize: 35, color: '#30CB89'}} onChangeText={(text)=>{setInfor((prev)=>{prev.faculty=text; return prev})}} onSubmitEditing={() => {Keyboard.dismiss();}} placeholder={`${infor.comment}`}></TextInput>
                            }
                            {!changeInfor[8] ? 
                                <TouchableOpacity onPress={() => {changeInformation(8); console.log(isTimeout); console.log(isTime); setDatachange(true);}}>
                                    <Ionicons name="pencil" size={24} color='#595959' />
                                </TouchableOpacity>
                                :<TouchableOpacity onPress={() => {changeInformation(8); console.log('終了'); console.log(isTime); setDatachange(false);}}>
                                    <Ionicons name="checkmark-circle-outline" size={24} color="red" />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </ScrollView>
                : 
                <SignUpScreen navigation={navigation}/>
                }
                { isLogin && <View style={styles.footer}>
                    <HomeFooter navigation={navigation} />
                </View>}                                    
            </View>            
        

    );
};
export default MyPage;