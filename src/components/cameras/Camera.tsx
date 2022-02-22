import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Dimensions, Image, Pressable, StyleSheet, Text, View, Alert,
} from 'react-native';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import { captureScreen } from 'react-native-view-shot';
import { useNavigation } from '@react-navigation/native';
import { convertBase64ToTensor, getModel, startPrediction } from '../../tensor/TensorFlow';
import { cropPicture } from '../../tensor/ImageTensorFlow';
import { ArModel, ModelsEnum } from '../ar-model';
import { Images } from '../../images';

const RESULT_MAPPING = ['Snake', 'Monkey', 'Rhinoceros'];

/**
 * @name CameraComponent
 * @description Handle User camera and the ArModel display
 * @constructor
 */
const CameraComponent: FunctionComponent = () => {
  let camera: Camera;
  const nav = useNavigation();
  // handle camera permission
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  // handle ar model processing
  const [presentedShape, setPresentedShape] = useState<ModelsEnum | null>(null);

  /**
   * @name handleImageCapture
   * @description When the button is selected, process the image
   */
  const handleImageCapture = async () => {
    setIsScanning(true);
    const imageData = await camera.takePictureAsync();
    await processImagePrediction(imageData);
  };

  /**
   * @name processImagePrediction
   * @description Handle image prediction
   * @param {CameraCapturedPicture} base64Image The picture captured by the camera
   */
  const processImagePrediction = async (base64Image: CameraCapturedPicture) => {
    const croppedData = await cropPicture(base64Image, 300);
    const model = await getModel();
    const tensor = convertBase64ToTensor(croppedData.base64);
    const prediction = await startPrediction(model, tensor);
    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    );
    console.log(RESULT_MAPPING[highestPrediction]);
    console.log(prediction);
    console.log(highestPrediction);

    if (prediction[highestPrediction] > 0.7) {
      setPresentedShape(RESULT_MAPPING[highestPrediction]);
    } else {
      Alert.alert('Error', 'No drawing found');
    }
    setIsScanning(false);
  };

  /**
   * @name handleScreenCapture
   * @description Take a screen of the app
   */
  const handleScreenCapture = async () => {
    const screenUri: string = await captureScreen();
    nav.navigate('Result', { screenUri });
  };

  // ask camera authorisation
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
      <Camera
        ref={(ref) => { camera = ref; }}
        style={StyleSheet.absoluteFillObject}
        type={Camera.Constants.Type.back}
        autoFocus
        whiteBalance={Camera.Constants.WhiteBalance.auto}
      >
        {presentedShape && (
          <ArModel model={presentedShape} />
        )}
      </Camera>
      <View style={styles.actions}>
        <Pressable
          onPress={handleImageCapture}
          style={styles.button}
        >
          <Image source={isScanning ? Images.spinner : Images.qrScan} style={styles.buttonIcon} />
        </Pressable>
        <Pressable
          onPress={handleScreenCapture}
          style={styles.button}
        >
          <Image source={Images.camera} style={styles.buttonIcon} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height,
  },
  actions: {
    position: 'absolute',
    width: '100%',
    bottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 102,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: '#B298FB',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: '80%',
    height: '80%',
  },
});

export default CameraComponent;
