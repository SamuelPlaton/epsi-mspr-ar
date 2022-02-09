import { GLView } from 'expo-gl';
import React, { FunctionComponent } from 'react';
import Expo2DContext from 'expo-2d-context';
import { ModelsEnum } from '../../components';

export interface RhinoZones {
  higherHead: Uint8ClampedArray,
  lowerHead: Uint8ClampedArray,
  horn: Uint8ClampedArray,
  lowerBody: Uint8ClampedArray,
  higherBody: Uint8ClampedArray,
}

export interface SnakeZones {
  higherHead: Uint8ClampedArray,
  lowerHead: Uint8ClampedArray,
  lowerBody: Uint8ClampedArray,
  higherBody: Uint8ClampedArray,
}

export interface MonkeyZones {
  higherHead: Uint8ClampedArray,
  lowerHead: Uint8ClampedArray,
  nose: Uint8ClampedArray,
  body: Uint8ClampedArray,
  paws: Uint8ClampedArray,
}

interface Props {
  onDetectedColors: (_: RhinoZones | SnakeZones | MonkeyZones) => void;
  model: ModelsEnum;
  src: string;
}

// example here : https://www.npmjs.com/package/expo-2d-context
/**
 * @name Canvas
 * @param {(_) => void} onDetectedColors Callback when colors are detected.
 * @param {ModelsEnum} model  The detected model.
 * @param {string} src The screenshot source.
 * @constructor
 */
const Canvas: FunctionComponent<Props> = ({ onDetectedColors, model, src }) => {
  const onGLContextCreate = async (gl) => {
    // Setup canva context
    const ctx = new Expo2DContext(gl);
    const imageObj = new Image(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // eslint-disable-next-line func-names
    imageObj.onload = function () {
      const pattern = ctx.createPattern(imageObj, 'no-repeat');
      // display our pattern in the whole screen
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      // use theses lines to check a drawing zone x:y position
      /* ctx.fillStyle = 'red';
      ctx.fillRect(730, 700, 10, 10); */
      ctx.stroke();
      ctx.flush();
      if (model === ModelsEnum.RHINOCEROS) {
        const higherHead = ctx.getImageData(800, 800, 1, 1).data;
        const lowerHead = ctx.getImageData(850, 1100, 1, 1).data;
        const horn = ctx.getImageData(850, 950, 1, 1).data;
        const lowerBody = ctx.getImageData(830, 1230, 1, 1).data;
        const higherBody = ctx.getImageData(730, 1220, 1, 1).data;
        const rhinoZones: RhinoZones = {
          higherHead, higherBody, horn, lowerBody, lowerHead,
        };
        onDetectedColors(rhinoZones);
      } else if (model === ModelsEnum.SNAKE) {
        const higherHead = ctx.getImageData(730, 800, 1, 1).data;
        const lowerHead = ctx.getImageData(730, 900, 1, 1).data;
        const lowerBody = ctx.getImageData(640, 1080, 1, 1).data;
        const higherBody = ctx.getImageData(600, 1250, 1, 1).data;
        const snakeZones: SnakeZones = {
          higherHead, lowerHead, higherBody, lowerBody,
        };
        onDetectedColors(snakeZones);
      } else if (model === ModelsEnum.MONKEY) {
        const higherHead = ctx.getImageData(730, 700, 1, 1).data;
        const lowerHead = ctx.getImageData(730, 900, 1, 1).data;
        const nose = ctx.getImageData(800, 1050, 1, 1).data;
        const body = ctx.getImageData(780, 1250, 1, 1).data;
        const paws = ctx.getImageData(720, 1350, 1, 1).data;
        const monkeyZones: MonkeyZones = {
          higherHead, lowerHead, nose, body, paws,
        };
        onDetectedColors(monkeyZones);
      }
    };
    imageObj.src = src;
  };

  return (
    <GLView
      style={{
        flex: 1, width: 1000, height: 1000, zIndex: 0,
      }}
      onContextCreate={onGLContextCreate}
    />
  );
};

export default Canvas;
