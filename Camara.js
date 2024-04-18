import React, { useState, useEffect } from 'react';
import { View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // Cambio aquí
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const timestamp = Date.now();
      const newPhotoUri = `${FileSystem.documentDirectory}photo_${timestamp}.jpg`;
      await FileSystem.moveAsync({
        from: photo.uri,
        to: newPhotoUri,
      });
      setPhotoUri(newPhotoUri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera 
        style={{ flex: 1 }} 
        type={Camera.Constants.Type.back} 
        ref={ref => setCameraRef(ref)} 
      />
      <Button title="Tomar Foto" onPress={takePicture} />
      {photoUri && <Image source={{ uri: photoUri }} style={{ flex: 1 }} />}
    </View>
  );
}
