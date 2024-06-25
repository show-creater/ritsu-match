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
import MyPageImageHeader from '../../component/header/MyPageImageHeader';

const Setting = ({ navigation }) => {
    const windowHeight = Dimensions.get('window').height;
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
        {MyPageImageHeader()}
        <View style={styles.header}>
            <View style={styles.icon}></View>
            <View style={styles.informations}>
                <View style={styles.NameHeart}>
                    <Text style={{ fontSize: 20, color: '#30CB89' }}>{'倍雄 狭男'}</Text>
                    <View style={styles.heart}>
                        <Ionicons name="heart" size={24} color="deeppink" />
                        <View style={styles.heartCount}>
                            <Text style={{ fontSize: 18, paddingLeft: '10%', color: 'white' }}>{'×2'}</Text>
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
        </View>
        <View style={{paddingTop:'25%',justifyContent: "center",alignItems: 'center'}}>
            <Text style={{fontSize:21,}}>{'設定'}</Text>
        </View>
        <View style={{alignItems: 'center',marginVertical: 10,height: '15%'}}>
            <View style={styles.money}>
                <Text style={{fontSize: 30,paddingHorizontal: 49,paddingTop: 10}}>{'残高'}</Text>
                <Text style={{fontSize: 40,paddingHorizontal: 17,paddingTop: 10}}>{'￥248'}</Text>
                <Text style ={{fontSize: 23,position: 'absolute',top : 57,right: 10}}>{'チャージする'}</Text>
                <AntDesign style={{position: 'absolute',top : 55,right: 150}}name="pluscircleo" size={30} color="black" />
            </View>
        </View>
        <View style={{}}>
           <ScrollView>
                <View style={styles.settingmenu}>
                    <Text style={styles.settingtext}>{'アカウント設定'}</Text>
                    <View style={{alignItems: 'center',justifyContent: 'center',marginBottom: 30}}>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'電話番号'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{'09012345678'}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'メールアドレス'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 12,color: 'grey'}}>{'teramoto@icloud.com'}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'位置情報'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{'滋賀県草津市'}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                    </View>
                    <Text style={styles.settingtext}>{'マッチング設定'}</Text>
                    <View style={{alignItems: 'center',justifyContent: 'center',marginBottom: 20}}>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'プラン設定'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{'無料プラン'}</Text>
                            <AntDesign style={{position: 'absolute',right: 10}}name="right" size={24} color="black" />
                        </View>
                        <View style={styles.box}>
                            <Text style={{fontSize: 22,marginHorizontal: 20}}>{'マッチング相手'}</Text>
                            <Text style={{position: 'absolute',right: 50,fontSize: 20,color: 'grey'}}>{'女性・学内'}</Text>
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
