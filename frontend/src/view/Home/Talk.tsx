import React from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';

const Talk = ({ navigation }) => {
    const windowHeight = Dimensions.get('window').height;
    const a = 0;
    const styles = StyleSheet.create({
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
            height: 16000,
            marginTop: 160,
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: 900
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
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
        }



    });
    return (
        <View style={{ flex: 1, alignItems: 'center', height: 1000 }}>
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
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.personlist}>
                    <View style={styles.personInfo}>
                        <View style={{paddingRight: '2%'}}>
                            <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                        </View>
                        <Text style={{fontSize: 20}}>ディカプリオ</Text>
                    </View>
                    <View style={styles.personInfo}>
                        <View style={{paddingRight: '2%'}}>
                            <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                        </View>
                        <Text style={{fontSize: 20}}>ディカプリオ</Text>
                    </View>
                    <View style={styles.personInfo}>
                        <View style={{paddingRight: '2%'}}>
                            <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                        </View>
                        <Text style={{fontSize: 20}}>ディカプリオ</Text>
                    </View>
                    <View style={styles.personInfo}>
                        <View style={{paddingRight: '2%'}}>
                            <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                        </View>
                        <Text style={{fontSize: 20}}>ディカプリオ</Text>
                    </View>
                    <View style={styles.personInfo}>
                        <View style={{paddingRight: '2%'}}>
                            <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                        </View>
                        <Text style={{fontSize: 20}}>ディカプリオ</Text>
                    </View>
                    <View style={styles.personInfo}>
                        <View style={{paddingRight: '2%'}}>
                            <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                        </View>
                        <Text style={{fontSize: 20}}>ディカプリオ</Text>
                    </View>
                    <View style={styles.personInfo}>
                        <View style={{paddingRight: '2%'}}>
                            <Ionicons name="person-circle-outline" size={50} color="#30CB89" />
                        </View>
                        <Text style={{fontSize: 20}}>ディカプリオ</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <HomeFooter navigation={navigation} />
            </View>
        </View>
    )
};
export default Talk;
