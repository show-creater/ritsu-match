import LottieView from 'lottie-react-native';
import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Dimensions
} from 'react-native';

const GoodAnimation=()=>{
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const styles = StyleSheet.create({ 
        container1: {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            zIndex: 100,
            elevation: 1000, // For Android
            shadowColor: '#000', // For iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            width: windowWidth,
            height: windowHeight,
            backgroundColor: 'rgba(48, 203, 137, 0.2)',
            pointerEvents: 'none',
        },
      });
return(
    <View style={styles.container1}>
        <LottieView
            source={require('../../../assets/ThumbsUp.json')}
            autoPlay
            loop
            speed={3}
            style={{
                width: 200,
                height: 200,
                
            }}
        />                
    </View>
)
};export default GoodAnimation;