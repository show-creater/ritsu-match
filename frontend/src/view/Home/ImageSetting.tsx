import React, { useState } from 'react';
import { Button, Alert, Image, View, Platform, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import MyPageImageHeader from '../../component/header/MyPageImageHeader';
import HomeFooter from '../../component/footer/HomeFooter';
import { Entypo } from '@expo/vector-icons';
import { db, auth } from '../../../firebaseConfig';











//今後プロフ画を複数設定できるようにするならこれ使う










const UploadImage = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const storage = getStorage();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result, 'resultそのもの');
        console.log(result.assets[0].uri, 'uri表示');
        const imageBlob = await fetch(result.assets[0].uri).then(response => response.blob());
        const storageRef = ref(storage, `user_image/${auth.currentUser.uid}`);
        const metadata = {
          contentType: 'image/jpeg', // アップロードするデータのコンテンツタイプ
        };
        await uploadBytes(storageRef, imageBlob, metadata);
        console.log('Image uploaded successfully!');
      }
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };


  const handleDeleteImage = async () => {
    // 画像を削除する前に確認のダイアログを表示
    Alert.alert(
      '画像を削除しますか？',
      'この操作は取り消せません。',
      [
        { text: 'キャンセル', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: '削除', onPress: () => console.log('helllllllll') }
      ],
      { cancelable: false }
    );
  };

  // const uploadImage = async () => {
  //   if (imageUri) {
  //     const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
  //     const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
  //     const task = storage()
  //       .ref(filename)
  //       .putFile(uploadUri);

  //     try {
  //       await task;
  //       const url = await storage().ref(filename).getDownloadURL();
  //       console.log('Image uploaded to the bucket!', url);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // };

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
    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', width: windowWidth }}>
      <MyPageImageHeader />
      <ScrollView contentContainerStyle={{ width: windowWidth, alignItems: 'center' }}>
        <View style={{ marginTop: '10%', height: '40%', width: '90%', flexWrap: 'wrap' }} >
          <TouchableOpacity style={{ borderWidth: 2, height: '90%', width: '50%', margin: '4%', borderRadius: 10, borderColor: '#30CB89' }} onPress={handleDeleteImage}>
            <Image style={{ width: '100%', height: '100%', borderRadius: 10, zIndex: -1 }}
              source={require('../../component/photo/サンプル.jpg')}
              resizeMode='cover'
            />
          </TouchableOpacity>
          <View style={{ borderWidth: 2, height: '41.25%', width: '30%', margin: '4%', borderRadius: 10, borderColor: '#30CB89' }}></View>
          <TouchableOpacity style={{ borderWidth: 2, height: '41.25%', width: '30%', margin: '4%', borderRadius: 10, borderColor: '#30CB89', justifyContent: 'center', alignItems: 'center' }} onPress={pickImage}>
            <Entypo name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ height: 1000, width: '100%', flexDirection: 'row' }}>
          <TouchableOpacity style={{ borderWidth: 2, height: '16.25%', width: '25%', margin: '4%', borderRadius: 10, borderColor: '#30CB89', justifyContent: 'center', alignItems: 'center' }} onPress={pickImage}>
            <Entypo name="plus" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderWidth: 2, height: '16.25%', width: '25%', margin: '4%', borderRadius: 10, borderColor: '#30CB89', justifyContent: 'center', alignItems: 'center' }} onPress={pickImage}>
            <Entypo name="plus" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderWidth: 2, height: '16.25%', width: '25%', margin: '4%', borderRadius: 10, borderColor: '#30CB89', justifyContent: 'center', alignItems: 'center' }} onPress={pickImage}>
            <Entypo name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <HomeFooter navigation={navigation} />
      </View>
    </View>

  );
};

export default UploadImage;
