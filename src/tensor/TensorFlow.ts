import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import { Base64Binary } from './utils';
import {LayersModel, Rank, Tensor} from "@tensorflow/tfjs";

const BITMAP_DIMENSION = 224;

const modelJson = require('../model/model.json');
const modelWeights = require('../model/weights.bin');

// 0: channel from JPEG-encoded image
// 1: gray scale
// 3: RGB image
const TENSORFLOW_CHANNEL = 3;

export const getModel = async (): Promise<LayersModel> => {
  try {
    // wait until tensorflow is ready
    await tf.ready();
    // load the trained model
    return await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
  } catch (error) {
    return error;
  }
};

export const convertBase64ToTensor = (base64: string): tf.Tensor<tf.Rank> => {
  try {
    const uIntArray = Base64Binary.decode(base64, null);
    // decode a JPEG-encoded image to a 3D Tensor of dtype
    const decodedImage = decodeJpeg(uIntArray, 3);
    // reshape Tensor into a 4D array
    return decodedImage.reshape([
      1,
      BITMAP_DIMENSION,
      BITMAP_DIMENSION,
      TENSORFLOW_CHANNEL,
    ]);
  } catch (error) {
    return error;
  }
};

export const startPrediction = (model: LayersModel, tensor: Tensor<Rank>): Float32Array | Int32Array | Uint8Array => {
  try {
    // predict against the model
    const output = model.predict(tensor) as Tensor<Rank>;
    // return typed array
    return output.dataSync();
  } catch (error) {
    return error;
  }
};
