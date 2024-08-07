import React, {useEffect, useState, useRef} from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';
import { useHome } from '../../component/context/HomeContext'
import { auth,db,storage } from '../../../firebaseConfig';
import { arrayUnion, updateDoc, Timestamp, onSnapshot, orderBy, addDoc, doc, getDoc, setDoc , collection, getDocs, getFirestore, query, where } from '@firebase/firestore';
import { TouchableOpacity } from 'react-native';
import Friends from './SearchResultList';
import MyPageImageHeader from '../../component/header/MyPageImageHeader';
import SettingHeader from '../../component/header/SettingHeader';

const Setting = ({ navigation }) => {
    const { isLogin, setIsLogin, loginUser, setLoginUser, isTimeout, setIsTimeout, isTime, setIsTime, myPageNow, setMyPageNow, infor, setInfor, userImage, setUserImage } = useHome();
    const windowHeight = Dimensions.get('window').height;
    const [myinfor,setMyinfor] = useState({ name: '', faculty: '', heart: '', image: '', age: 0, comment: '', heart_pushed: [], userid: '', randomField: '',number: '',plan: '',matching: '',mailaddress: '',location: '',blocklist: [],money: 0,remainingheart: 0});
    //const [myinfor,setMyinfor] = useState({});
    const [changeInfor,setChangeInfor] = useState(false);
    useEffect(() => {
        //infor()
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = async () =>{
            const docdata= await getDoc(docRef);
            //console.log(docdata.data());
            setMyinfor(docdata.data());
        };
        docSnap();
        // console.log(myinfor);
        // console.log(myinfor.name);
    }, []);
    const styles=StyleSheet.create({
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
            top: 90,
            backgroundColor: 'white',
            zIndex:1,
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
        money:{
            height:'100%',
            width:'95%',
            backgroundColor:'white',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center'
        },
        settingmenu:{
            width:'100%',
            height: 1300
        },
        settingtext:{
            fontSize:20,
            paddingTop:20,
            paddingLeft:30,
        },
        box:{
            height:55,
            width:'90%',
            backgroundColor:'white',
            borderRadius: 15,
            marginVertical: 5,
            alignItems: 'center',
            flexDirection: 'row',
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            zIndex:1,
            backgroundColor: 'red'
        },
    });
   return(
    <View style={{flex: 1}}>
        {isLogin && <MyPageImageHeader/>}
        <SettingHeader/> 
        <View style={{paddingTop:'10%',justifyContent: "center",alignItems: 'center'}}>
            <Text style={{fontSize:21,}}>{'設定'}</Text>
        </View>
        <View style={{alignItems: 'center',marginVertical: 10,height: '15%'}}>
            <View style={styles.money}>
                <View style={{flexDirection: 'column', width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 30}}>{'残高'}</Text>
                    <Text style={{fontSize: 30}}>{`¥${myinfor.money}`}</Text>                    
                </View>
                <View style={{flexDirection: 'row', width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                    <AntDesign name="pluscircleo" size={30} color="black" />
                    <Text style ={{fontSize: 23}}>{'チャージする'}</Text>                
                </View>

            </View>
        </View>
        <View>
           <ScrollView>
                <View style={styles.settingmenu}>
                    <Text style={styles.settingtext}>{'アカウント設定'}</Text>
                    <View style={{alignItems: 'center',justifyContent: 'center',marginBottom: 30}}>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'電話番号'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{`${myinfor.number}`}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'メールアドレス'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{`${myinfor.mailaddress}`}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'位置情報'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{`${myinfor.location}`}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                    </View>
                    <Text style={styles.settingtext}>{'マッチング設定'}</Text>
                    <View style={{alignItems: 'center',justifyContent: 'center',marginBottom: 20}}>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'プラン設定'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{`${myinfor.plan}`}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'マッチング相手'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{`${myinfor.matching}`}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'ブロックリスト'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{''}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                    </View>
                    <Text style={styles.settingtext}>{'その他'}</Text>
                    <View style={{alignItems: 'center',justifyContent: 'center',marginBottom: 20}}>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'利用規約'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{''}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'通報'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{''}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                    </View>
                    <View style={{alignItems: 'center',marginVertical: 10}}>
                        <Text style={{fontSize: 22,marginBottom: 20,color: 'blue'}}>{'ログアウト'}</Text>
                        <Text style={{fontSize: 22,marginBottom: 20,color: 'red'}}>{'アカウント削除'}</Text>
                    </View>
                </View>        
            </ScrollView> 
        </View>
        <View style={styles.footer}>
            <HomeFooter navigation={navigation} />
        </View>
    </View>
    
   );
};
export default Setting;
