import React from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';

const MyPage=({navigation})=>{
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
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
                <ScrollView style={{width: '100%', height: '100%'}}>
                    <View style={styles.imageContainer}>
                        <Image style={{ width: windowWidth, height: windowHeight}}
                            source={require('../../component/photo/ディカプリオ.webp')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={styles.profile}>
                        <Text style={{fontSize: 35, color: '#30CB89'}}>レオナルドディカプリオ</Text>
                        <View style={styles.fucility}>
                            <Text style={{fontSize: 25, color: '#30CB89'}}>理工学部</Text>
                            <Ionicons name="pencil" size={24} color='#595959' />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>年齢</Text>
                            <Text style={styles.profileStatus}>23歳</Text>
                            <Ionicons name="pencil" size={24} color='#595959' />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>身長</Text>
                            <Text style={styles.profileStatus}>184cm</Text>
                            <Ionicons name="pencil" size={24} color='#595959' />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>出身地</Text>
                            <Text style={styles.profileStatus}>東京都</Text>
                            <Ionicons name="pencil" size={24} color='#595959' />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>趣味</Text>
                            <Text style={styles.profileStatus}>映画鑑賞</Text>
                            <Ionicons name="pencil" size={24} color='#595959' />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>血液型</Text>
                            <Text style={styles.profileStatus}>B型</Text>
                            <Ionicons name="pencil" size={24} color='#595959' />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>大学</Text>
                            <Text style={styles.profileStatus}>立命館大学</Text>
                            <Ionicons name="pencil" size={24} color='#595959' />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileText}>自己紹介</Text>
                            <Text style={styles.profileStatus}>私がギャッツビーです</Text>
                            <Ionicons name="pencil" size={24} color='#595959' />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <HomeFooter navigation={navigation} />
                </View>                                     
            </View>            
        

    );
};
export default MyPage;