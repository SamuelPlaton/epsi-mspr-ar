import { GLView } from 'expo-gl';
import React, { FunctionComponent } from 'react';
import Expo2DContext from 'expo-2d-context';
import {Asset, useAssets} from 'expo-asset';

interface Props {
  src: string;
}

// example here : https://www.npmjs.com/package/expo-2d-context
const Context: FunctionComponent<Props> = ({ src }) => {
  const onGLContextCreate = async (gl) => {
    console.log('onGLContextCreate');
    // Setup canva context
    const ctx = new Expo2DContext(gl);
    // Here example asset
    const imageObj = new Image(gl.drawingBufferWidth, gl.drawingBufferHeight);
    imageObj.onload = function() {
      const pattern = ctx.createPattern(imageObj, 'no-repeat');
      // display our pattern in the whole screen
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      ctx.stroke();
      ctx.flush();
      // retrieve pixel informations
      const pixel200200 = ctx.getImageData(200, 200, 1, 1); // here RGB in pos 200:200
      console.log('COLOR AT 200 200 : ');
      console.log(pixel200200.data);
      const pixel100100 = ctx.getImageData(100, 100, 1, 1); // here RGB in pos 100:100
      console.log('COLOR AT 100 100 : ');
      console.log(pixel100100.data);
    };
    imageObj.src = src;
  };

  return (
    <GLView
      style={{
        flex: 1, width: 1000, height: 1000, zIndex: 200,
      }}
      onContextCreate={onGLContextCreate}
    />
  );
};

export default Context;
