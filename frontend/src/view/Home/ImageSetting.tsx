import React, { useState } from 'react';
import { Button, Image, View, Platform, Text, ScrollView, StyleSheet } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
import MyPageImageHeader from '../../component/header/MyPageImageHeader';
import HomeFooter from '../../component/footer/HomeFooter';

const UploadImage = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (imageUri) {
      const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
      const task = storage()
        .ref(filename)
        .putFile(uploadUri);

      try {
        await task;
        const url = await storage().ref(filename).getDownloadURL();
        console.log('Image uploaded to the bucket!', url);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },



});

  return (
    <View style={{ flex: 1, alignItems: 'center', height: 1000, }}>
      <MyPageImageHeader/>
      <View style={{marginTop: '10%', height: '70%', width: '90%', flexWrap: 'wrap'}}>
        <View style={{borderWidth: 2, height: '30%', width: '25%', margin: '4%', borderRadius: 10, borderColor: '#30CB89'}}>
        <Image style={{ width: '100%', height: '100%', borderRadius: 10, zIndex: -1 }}
          source={require('../../component/photo/サンプル.jpg')}
          resizeMode='cover'
        />
        </View>
        <View style={{borderWidth: 2, height: '30%', width: '25%', margin: '4%', borderRadius: 10, borderColor: '#30CB89'}}></View>
        <View style={{borderWidth: 2, height: '30%', width: '25%', margin: '4%', borderRadius: 10, borderColor: '#30CB89'}}></View>
        <View style={{borderWidth: 2, height: '30%', width: '25%', margin: '4%', borderRadius: 10, borderColor: '#30CB89'}}></View>
        <View style={{borderWidth: 2, height: '30%', width: '25%', margin: '4%', borderRadius: 10, borderColor: '#30CB89'}}></View>
        <View style={{borderWidth: 2, height: '30%', width: '25%', margin: '3%', borderRadius: 10, borderColor: '#30CB89'}}></View>
      <View/>
      </View>
      <View style={styles.footer}>
        <HomeFooter navigation={navigation} />
      </View>      
    </View>

  );
};

export default UploadImage;
