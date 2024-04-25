import React from 'react';
import {Text,View,StyleSheet,ScrollView,Image,Dimensions} from 'react-native';
import HomeFooter from '../../component/footer/HomeFooter';

const Friends = ({navigation}) => {
    const windowHeight = Dimensions.get('window').height;
    const styles = StyleSheet.create({ 
        footer: {
            position: 'absolute',
            bottom: 0,
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        main: {
            paddingTop:'18%',
            paddingBottom:'23%',
            //backgroundColor:'red',
            },
        container: {
            flexDirection:'row',
            padding:'auto',
            flexWrap:'wrap',
        },
        containerBox: {
            width:'47%',
            height:240,//ちょうどいい要素の高さ
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
            top:123,
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
    });
    return (
        <View style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                <View>
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
                </View>

            </ScrollView>
            <View style={styles.footer}>
                <HomeFooter navigation={navigation}/>
            </View>
        </View>
    )
};
export default Friends;