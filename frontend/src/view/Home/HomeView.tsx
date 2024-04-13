import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeFooter from '../../component/footer/HomeFooter';
import { AntDesign } from '@expo/vector-icons';

const HomeView = () => {
    const a=0;
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
            top: 25
        },
        icon: {
            backgroundColor: 'black',
            borderRadius: 100,
            height: 50,
            width: 50,
            marginLeft: 20,
            marginRight: 10
        },
        informations:{
            flexDirection: 'column',
        },
        NameHeart: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '85%',
            paddingLeft: '5%',
            paddingBottom: 5
            
        },
        heart: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        heartCount: {
            backgroundColor: 'silver',
            width: '50%',
            borderRadius: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: '5%'
        },
        FucilityDate: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
            paddingLeft: '3%'
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            height: '10%',
            justifyContent: 'center',
            alignItems: 'center'
        }
        
    });
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={styles.header}>
                <View style={styles.icon}></View>
                <View style={styles.informations}>
                    <View style={styles.NameHeart}>
                        <Text style={{fontSize: 20, color: '#30CB89'}}>{'山田太郎'}</Text>
                        <View style={styles.heart}>
                            <Ionicons name="heart" size={24} color="deeppink" />
                            <View style={styles.heartCount}>
                                <Text style={{fontSize: 18, paddingLeft: '10%', color: 'white'}}>{`× ${a}`}</Text>
                                <AntDesign name="plus" size={15} color="dodgerblue" />
                            </View>
                        </View>
                    </View>
                    <View style={styles.FucilityDate}>
                        <View style={{flexDirection: 'row'}}>
                            <Ionicons name="pencil" size={24} color= '#30CB89' />                            
                            <Text style={{fontSize: 16, color: '#30CB89'}}>{'薬学部'}</Text>                            
                        </View>
                        <Text style={{fontSize: 16, color: '#30CB89'}}>{'2日 12:05'}</Text>
                    </View>
                </View>
            </View>
            <View>
            </View>
            <View style={styles.footer}>
                <HomeFooter/>
            </View>   
        </View>
    )
};
export default HomeView;
