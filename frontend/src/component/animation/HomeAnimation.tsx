import LottieView from 'lottie-react-native';
import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  StyleSheet
} from 'react-native';

const Animation1=()=>{
    const styles = StyleSheet.create({ 
        container1: {
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            position: 'absolute',
            bottom: 0,
            elevation: 1000, // For Android
            shadowColor: '#000', // For iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
        },
      });
return(
    <View style={styles.container1}>
        <LottieView
            source={require('../../../assets/animation1.json')}
            autoPlay
            loop
            speed={2}
            style={{
                width: 200,
                height: 200,
                
            }}
        />                
    </View>
)
};export default Animation1;