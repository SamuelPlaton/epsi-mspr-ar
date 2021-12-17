import React, { useState, useEffect, FunctionComponent } from 'react';
import {
  Dimensions, StyleSheet, Text, View,
} from 'react-native';
import { Camera } from 'expo-camera';

const CameraComponent: FunctionComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFillObject} type={Camera.Constants.Type.back} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height,
  },
});
export default CameraComponent;
