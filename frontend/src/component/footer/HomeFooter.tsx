import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeFooter = () => {
    const a=0;
    const styles=StyleSheet.create({
        header: {
            flexDirection: 'row',
            margin: 10,
            height: '100%',
            alignItems: 'center',
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
            
        },
        heart: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        heartCount: {
            backgroundColor: 'silver',
            width: '50%',
            borderRadius: 20,
            justifyContent: 'center'
        },
        FucilityDate: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
            paddingLeft: '3%'
        }
        
    });
    return (
        <View style={styles.header}>
            <View style={styles.icon}></View>
            <View style={styles.informations}>
                <View style={styles.NameHeart}>
                    <Text style={{fontSize: 20, color: '#30CB89'}}>{'山田太郎'}</Text>
                    <View style={styles.heart}>
                        <Ionicons name="heart" size={24} color="deeppink" />
                        <View style={styles.heartCount}>
                            <Text style={{paddingLeft: '10%', color: 'white'}}>{`×${a}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.FucilityDate}>
                    <View style={{flexDirection: 'row'}}>
                        <Ionicons name="pencil" size={24} color= '#30CB89' />                            
                        <Text style={{color: '#30CB89'}}>{'薬学部'}</Text>                            
                    </View>

                    <Text style={{color: '#30CB89'}}>{'2日 12:05'}</Text>
                </View>
            </View>
        </View> 
    )
};
export default HomeFooter;
