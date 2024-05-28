import React from 'react';
import {Text,View,StyleSheet,ScrollView,Image,Dimensions} from 'react-native';
import HomeFooter from '../../component/footer/HomeFooter';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';
import { useHome } from '../../component/context/HomeContext';
import { AntDesign } from '@expo/vector-icons';

const Friends = ({navigation}) => {
    const {isLogin, setIsLogin, talkPage, setTalkPage}=useHome();
    const windowHeight = Dimensions.get('window').height;
    const a = 0;
    const styles = StyleSheet.create({ 
        container1: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        main: {
            height:1420, //ちょうど５列要素が入る高さ
            paddingTop:'10%',
            },
        container: {
            height:windowHeight,//これが悪い
            flexDirection:'row',
            padding:'auto',
            flexWrap:'wrap',
        },
        containerBox: {
            width:'47%',
            height:'28%',
            borderRadius:15,
            shadowColor:"#333",
            shadowOpacity:0.30,
            shadowRadius:3,
            backgroundColor:"white",
            margin:5.5,
        },
        containerImg:{
            height:'60%',
        },
        containerTextTime:{
            position:'absolute',
            zIndex:1,
            top:123,//アイフォン１５ではちょうどいい高さ、パーセントが使えない
            width:'100%',
            height:'15%',
            backgroundColor:'rgba(0,0,0,0.5)',
        },
        containerTextName:{
            fontSize:30,
            textAlign:"center",
            paddingTop:15,
        },
        containerTextInformation:{
            fontSize:15,
            textAlign:"center",
            paddingTop:8,
            color:"black",
            opacity:0.5,
        },
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
            marginTop: '45%',
            alignItems: 'center',
            flexDirection: 'column',
        },
        personInfo: {
            width: '100%',
            justifyContent: 'flex-start',
            borderTopWidth: 1,
            borderTopColor: 'silver',
            flexDirection: 'row',
            paddingLeft: '2%',
            alignItems: 'center',
            paddingVertical: '4%'
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
        <View style={{ flex: 1, alignItems: 'center', height: 1000,  }}>  
            <View style={styles.header}>
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
            </View>
            <ScrollView style={{flex:1}}>
                <View style={styles.personlist}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.TalkButton} onPress={()=>{setTalkPage(true)}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>トーク</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.MatchingButton} onPress={()=>{setTalkPage(false)}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>マッチング</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    <View style={styles.main}>
                        <View style = {styles.container}>
                            <View style = {styles.containerBox}>
                                <View style = {styles.containerImg}>
                                    <Image style={{ width: '100%', height: '100%', zIndex: -1 ,borderTopLeftRadius:15,borderTopRightRadius:15}}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                    />
                                    <View style = {styles.containerTextTime}><Text style = {{color:'white',textAlign:'center',fontSize:15}}>2時間前</Text></View>
                                    <Text style = {styles.containerTextName}>田中</Text>
                                    <Text style = {styles.containerTextInformation}>22歳・滋賀</Text>
                                </View>
                            </View>
                            <View style = {styles.containerBox}>
                                <View style = {styles.containerImg}>
                                    <Image style={{ width: '100%', height: '100%', zIndex: -1 ,borderTopLeftRadius:15,borderTopRightRadius:15}}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                    />
                                    <View style = {styles.containerTextTime}><Text style = {{color:'white',textAlign:'center',fontSize:15}}>2時間前</Text></View>
                                    <Text style = {styles.containerTextName}>田中</Text>
                                    <Text style = {styles.containerTextInformation}>22歳・滋賀</Text>
                                </View>
                            </View>
                            <View style = {styles.containerBox}>
                                <View style = {styles.containerImg}>
                                    <Image style={{ width: '100%', height: '100%', zIndex: -1 ,borderTopLeftRadius:15,borderTopRightRadius:15}}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                    />
                                    <View style = {styles.containerTextTime}><Text style = {{color:'white',textAlign:'center',fontSize:15}}>2時間前</Text></View>
                                    <Text style = {styles.containerTextName}>田中</Text>
                                    <Text style = {styles.containerTextInformation}>22歳・滋賀</Text>
                                </View>
                            </View>
                            <View style = {styles.containerBox}>
                                <View style = {styles.containerImg}>
                                    <Image style={{ width: '100%', height: '100%', zIndex: -1 ,borderTopLeftRadius:15,borderTopRightRadius:15}}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                    />
                                    <View style = {styles.containerTextTime}><Text style = {{color:'white',textAlign:'center',fontSize:15}}>2時間前</Text></View>
                                    <Text style = {styles.containerTextName}>田中</Text>
                                    <Text style = {styles.containerTextInformation}>22歳・滋賀</Text>
                                </View>
                            </View>
                            <View style = {styles.containerBox}>
                                <View style = {styles.containerImg}>
                                    <Image style={{ width: '100%', height: '100%', zIndex: -1 ,borderTopLeftRadius:15,borderTopRightRadius:15}}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                    />
                                    <View style = {styles.containerTextTime}><Text style = {{color:'white',textAlign:'center',fontSize:15}}>2時間前</Text></View>
                                    <Text style = {styles.containerTextName}>田中</Text>
                                    <Text style = {styles.containerTextInformation}>22歳・滋賀</Text>
                                </View>
                            </View>
                            <View style = {styles.containerBox}>
                                <View style = {styles.containerImg}>
                                    <Image style={{ width: '100%', height: '100%', zIndex: -1 ,borderTopLeftRadius:15,borderTopRightRadius:15}}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                    />
                                    <View style = {styles.containerTextTime}><Text style = {{color:'white',textAlign:'center',fontSize:15}}>2時間前</Text></View>
                                    <Text style = {styles.containerTextName}>田中</Text>
                                    <Text style = {styles.containerTextInformation}>22歳・滋賀</Text>
                                </View>
                            </View>
                            <View style = {styles.containerBox}>
                                <View style = {styles.containerImg}>
                                    <Image style={{ width: '100%', height: '100%', zIndex: -1 ,borderTopLeftRadius:15,borderTopRightRadius:15}}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                    />
                                    <View style = {styles.containerTextTime}><Text style = {{color:'white',textAlign:'center',fontSize:15}}>2時間前</Text></View>
                                    <Text style = {styles.containerTextName}>田中</Text>
                                    <Text style = {styles.containerTextInformation}>22歳・滋賀</Text>
                                </View>
                            </View>
                            <View style = {styles.containerBox}>
                                <View style = {styles.containerImg}>
                                    <Image style={{ width: '100%', height: '100%', zIndex: -1 ,borderTopLeftRadius:15,borderTopRightRadius:15}}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                    />
                                    <View style = {styles.containerTextTime}><Text style = {{color:'white',textAlign:'center',fontSize:15}}>2時間前</Text></View>
                                    <Text style = {styles.containerTextName}>田中</Text>
                                    <Text style = {styles.containerTextInformation}>22歳・滋賀</Text>
                                </View>
                            </View>
                            <View style = {styles.containerBox}>
                                <View style = {styles.containerImg}>
                                    <Image style={{ width: '100%', height: '100%', zIndex: -1 ,borderTopLeftRadius:15,borderTopRightRadius:15}}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                    />
                                    <View style = {styles.containerTextTime}><Text style = {{color:'white',textAlign:'center',fontSize:15}}>2時間前</Text></View>
                                    <Text style = {styles.containerTextName}>田中</Text>
                                    <Text style = {styles.containerTextInformation}>22歳・滋賀</Text>
                                </View>
                            </View>
                            <View style = {styles.containerBox}>
                                <View style = {styles.containerImg}>
                                    <Image style={{ width: '100%', height: '100%', zIndex: -1 ,borderTopLeftRadius:15,borderTopRightRadius:15}}
                                            source={require('../../component/photo/ディカプリオ.webp')}
                                            resizeMode='cover'
                                    />
                                    <View style = {styles.containerTextTime}><Text style = {{color:'white',textAlign:'center',fontSize:15}}>2時間前</Text></View>
                                    <Text style = {styles.containerTextName}>田中</Text>
                                    <Text style = {styles.containerTextInformation}>22歳・滋賀</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            <View style={styles.footer}>
                <HomeFooter navigation={navigation}/>
            </View>
        </View>
    )
};
export default Friends;