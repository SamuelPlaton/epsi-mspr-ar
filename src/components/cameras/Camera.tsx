import React, {
  useState, useEffect, FunctionComponent,
} from 'react';
import {
  ActivityIndicator,
  Dimensions, Modal, Pressable, StyleSheet, Text, View,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from '../../tensor/TensorFlow';
import { cropPicture } from '../../tensor/ImageTensorFlow';

const RESULT_MAPPING = ['Snake', 'Monkey', 'Rhinoceros'];

const CameraComponent: FunctionComponent = () => {
  let camera: Camera
  const [hasPermission, setHasPermission] = useState(null);
  const [setRollPermission] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [presentedShape, setPresentedShape] = useState('');
  const handleImageCapture = async () => {
    setIsProcessing(true);
    const imageData = await camera.takePictureAsync();

    processImagePrediction(imageData);
  };

  const processImagePrediction = async (base64Image) => {
    const croppedData = await cropPicture(base64Image, 300);
    // const asset = await MediaLibrary.createAssetAsync(croppedData.uri);
    const model = await getModel();
    const tensor = await convertBase64ToTensor(croppedData.base64);
    const prediction = await startPrediction(model, tensor);
    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    );
    if (prediction[highestPrediction] > 0.7) {
      setPresentedShape(RESULT_MAPPING[highestPrediction]);
    }
    // view prediction result
    console.log(prediction);
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      const { camroll } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      setRollPermission(camroll === 'granted');
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

      <Modal visible={isProcessing} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>
              Your current shape is
              {presentedShape}
            </Text>
            {presentedShape === '' && <ActivityIndicator size="large" />}
            <Pressable
              style={styles.dismissButton}
              onPress={() => {
                setPresentedShape('');
                setIsProcessing(false);
              }}
            >
              <Text>Dismiss</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Camera
        ref={(ref) => {camera = ref}}
        style={StyleSheet.absoluteFillObject}
        type={Camera.Constants.Type.back}
        autoFocus
        whiteBalance={Camera.Constants.WhiteBalance.auto}
      />
      <Pressable
        onPress={() => handleImageCapture()}
        style={styles.captureButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height,
  },
  captureButton: {
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 50,
    bottom: 40,
    width: 100,
    zIndex: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 24,
    backgroundColor: 'gray',
  },
  dismissButton: {
    width: 150,
    height: 50,
    marginTop: 60,
    borderRadius: 24,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
export default CameraComponent;
