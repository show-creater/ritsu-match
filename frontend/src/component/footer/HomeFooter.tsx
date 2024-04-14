import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeFooter = ({navigation}) => {
    const a=0;
    const styles=StyleSheet.create({
        footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F8F8F8',
            height: '100%'
        },
        icon: {
            width: '25%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        
    });
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.icon} onPress={()=>{navigation.navigate('Home')}}>
                <Ionicons name="notifications-outline" size={40} color='#30CB89' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>{navigation.navigate('Friends')}}>
                <Ionicons name="person-outline" size={40} color='#30CB89' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>{navigation.navigate('Talk')}}>
                <Ionicons name="chatbubble-ellipses-outline" size={40} color='#30CB89' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>{navigation.navigate('MyPage')}}>
            <Ionicons name="person-circle-outline" size={40} color='#30CB89' />
            </TouchableOpacity>
        </View> 
    )
};
export default HomeFooter;
