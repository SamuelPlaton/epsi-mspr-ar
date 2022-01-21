import { Dimensions } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get('window');

// dimension of teachable machine
export const BITMAP_DIMENSION = 224;

export const cropPicture = async (imageData, maskDimension) => {
  try {
    const { uri, width, height } = imageData;
    const cropWidth = maskDimension * (width / DEVICE_WIDTH);
    const cropHeight = maskDimension * (height / DEVICE_HEIGHT);
    const actions = [
      {
        crop: {
          originX: width / 2 - cropWidth / 2,
          originY: height / 2 - cropHeight / 2,
          width: cropWidth,
          height: cropHeight,
        },
      },
      {
        resize: {
          width: BITMAP_DIMENSION,
          height: BITMAP_DIMENSION,
        },
      },
    ];
    const saveOptions = {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    };
    return await ImageManipulator.manipulateAsync(uri, actions, saveOptions);
  } catch (error) {
    return error;
  }
};
