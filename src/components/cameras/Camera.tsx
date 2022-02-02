import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Dimensions, Modal, Pressable, StyleSheet, Text, View,
} from 'react-native';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { convertBase64ToTensor, getModel, startPrediction } from '../../tensor/TensorFlow';
import { cropPicture } from '../../tensor/ImageTensorFlow';
import { ArModel, ModelsEnum } from '../ar-model';

const RESULT_MAPPING = ['Snake', 'Monkey', 'Rhinoceros'];

/**
 * @name CameraComponent
 * @description Handle User camera and the ArModel display
 * @constructor
 */
const CameraComponent: FunctionComponent = () => {
  let camera: Camera;
  // handle camera permission
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [setRollPermission] = useState<boolean | null>(null);
  // handle ar model processing
  const [presentedShape, setPresentedShape] = useState<ModelsEnum | null>(null);

  /**
   * @name handleImageCapture
   * @description When the button is selected, process the image
   */
  const handleImageCapture = async () => {
    const imageData = await camera.takePictureAsync();
    processImagePrediction(imageData);
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
    // eslint-disable-next-line no-console
    console.log('TENSOR : ', tensor); // TENSOR :  [Error: Expected image (JPEG, PNG, or GIF), but got unsupported image type]
    const prediction = await startPrediction(model, tensor);
    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    );
    if (prediction[highestPrediction] > 0.7) {
      setPresentedShape(RESULT_MAPPING[highestPrediction]);
    }
  };

  // ask camera authorisation
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
      {presentedShape && (
      <Modal visible transparent>
        <ArModel model={presentedShape} />
      </Modal>
      )}
      <Camera
        ref={(ref) => { camera = ref; }}
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
});

export default CameraComponent;
