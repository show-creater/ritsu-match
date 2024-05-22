import React, { useRef,useEffect, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity, TextInput ,Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { Animated, PanResponder } from 'react-native';
import { useHome } from '../../component/context/HomeContext';
import SignUpScreen from '../login/SignUpScreen';
import { collection, getDocs ,getDoc ,doc} from "firebase/firestore";
import { db } from '../../../firebaseConfig';

const MyPage=({navigation})=>{
    const {isLogin, setIsLogin, loginUser ,setLoginUser}=useHome();
    const [changeInfor,setChangeInfor] = useState(false);
    const [infor,setInfor] = useState({name: '', faculty: '', heart: 0, image:'', age: 0, comment: ''});
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
        const docRef = doc(db, "users", "LkW4tsYgDrVi6KTAv8iEGhtuzkB3");
        const docSnap = async () =>{
            const docdata = await getDoc(docRef);
            //console.log(docdata.data());
            setInfor(docdata.data());
        };
        docSnap();

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

    const ChangeInfor=()=>{
        
    };

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
            backgroundColor: 'red',
            alignItems: 'center'
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
                    <View style={styles.imageContainer}>
                        <Image style={{ width: windowWidth, height: windowHeight}}
                            source={require('../../component/photo/ディカプリオ.webp')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={styles.profile}>
                        <View style={styles.nameInfor}>
                            {!changeInfor?<Text style={{fontSize: 35, color: '#30CB89'}}>{`${infor.name}`}</Text>:<TextInput style={{borderWidth: 2, fontSize: 35, color: '#30CB89'}} onChangeText={(text)=>{setInfor((prev)=>{prev.name=text; return prev})}} onSubmitEditing={() => {Keyboard.dismiss();}}></TextInput>}
                            <TouchableOpacity onPress={() => {setChangeInfor(true)}}>
                                <Ionicons name="pencil" size={24} color='#595959' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fucility}>
                            <Text style={{fontSize: 25, color: '#30CB89'}}>{`${infor.faculty}`}</Text>
                            <TouchableOpacity>
                            <Ionicons name="pencil" size={24} color='#595959' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>年齢</Text>
                            <Text style={styles.profileStatus}>{`${infor.age}`}</Text>
                            <TouchableOpacity>
                            <Ionicons name="pencil" size={24} color='#595959' />
                            </TouchableOpacity>
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
                            <Text style={styles.profileStatus}>{`${infor.comment}`}</Text>
                            <TouchableOpacity>
                            <Ionicons name="pencil" size={24} color='#595959' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                : 
                <SignUpScreen navigation={navigation}/>
                }
                <View style={styles.footer}>
                    <HomeFooter navigation={navigation} />
                </View>                                    
            </View>            
        

    );
};
export default MyPage;