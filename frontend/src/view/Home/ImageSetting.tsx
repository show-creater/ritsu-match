import React, { useState } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const UploadImage = () => {
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

  return (
    <View>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
      ) : null}
      <Button title="Select Image" onPress={selectImage} />
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

export default UploadImage;
