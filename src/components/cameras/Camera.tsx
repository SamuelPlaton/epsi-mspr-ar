import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Dimensions, Image as ImageReact, Pressable, StyleSheet, Text, View, Alert,
} from 'react-native';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import { captureScreen } from 'react-native-view-shot';
import { useNavigation } from '@react-navigation/native';
import { ImageResult } from 'expo-image-manipulator';
import { convertBase64ToTensor, getModel, startPrediction } from '../../tensor/TensorFlow';
import { cropPicture } from '../../tensor/ImageTensorFlow';
import { Images } from '../../images';
import {
  MonkeyZones, RhinoZones, SnakeZones, Canvas, ArModel, ModelsEnum,
} from '../../components';

const RESULT_MAPPING = ['Snake', 'Monkey', 'Rhinoceros'];

interface Props {
  onRefresh: () => void;
}

/**
 * @name CameraComponent
 * @description Handle User camera and the ArModel display.
 * @param onRefresh Callback when the camera must be refreshed.
 * @constructor
 */
const CameraComponent: FunctionComponent<Props> = ({ onRefresh }) => {
  let camera: Camera;
  const nav = useNavigation();
  // handle camera permission
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  // handle screenshot process
  const [screenshot, setScreenshot] = useState<ImageResult>();
  // handle ar model processing
  const [presentedShape, setPresentedShape] = useState<ModelsEnum | null>(null);
  // handle detected colors
  const [detectedColors, setDetectedColors] = useState<RhinoZones | SnakeZones | MonkeyZones>();

  /**
   * @name handleImageCapture
   * @description When the button is selected, process the image
   */
  const handleImageCapture = async () => {
    if (presentedShape) {
      onRefresh();
      return;
    }
    setIsScanning(true);
    const imageData = await camera.takePictureAsync();
    setScreenshot(imageData);
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
  }, [presentedShape]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  /**
   * @name handleScanningSource
   * @description Handle which icon must be displayed on the scanning button.
   */
  const handleScanningSource = () => {
    if (isScanning) {
      return Images.spinner;
    } if (presentedShape) {
      return Images.reload;
    }
    return Images.qrScan;
  };

  return (
    <View style={styles.container}>
      { screenshot && presentedShape && (
        <Canvas
          src={screenshot.uri}
          model={presentedShape}
          onDetectedColors={(result) => setDetectedColors(result)}
        />
      )}
      <Camera
        ref={(ref) => { camera = ref; }}
        style={StyleSheet.absoluteFillObject}
        type={Camera.Constants.Type.back}
        autoFocus
        whiteBalance={Camera.Constants.WhiteBalance.auto}
      >
        {presentedShape && detectedColors && (
          <ArModel model={presentedShape} colors={detectedColors} />
        )}
      </Camera>
      {!presentedShape && !detectedColors && (
        <View style={styles.scanZoneContainer}>
          <View style={styles.scanZone} />
        </View>
      )}
      <View style={styles.actions}>
        <Pressable
          onPress={handleImageCapture}
          style={{ ...styles.button, backgroundColor: `${isScanning ? '#B1B1B1' : '#B298FB'}` }}
          disabled={isScanning}
        >
          <ImageReact
            source={handleScanningSource()}
            style={styles.buttonIcon}
          />
        </Pressable>
        <Pressable
          onPress={handleScreenCapture}
          style={styles.button}
        >
          <ImageReact source={Images.camera} style={styles.buttonIcon} />
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
  scanZoneContainer: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanZone: {
    width: '50%',
    height: 300,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#B298FB',
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
