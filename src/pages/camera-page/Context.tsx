import { GLView } from 'expo-gl';
import React from 'react';
import Expo2DContext from 'expo-2d-context';

export default class Context extends React.Component {
  render() {
    return (
      <GLView style={{ flex: 1 }} onContextCreate={this._onGLContextCreate} />
    );
  }
  // example here : https://www.npmjs.com/package/expo-2d-context
  _onGLContextCreate = (gl) => {
    const ctx = new Expo2DContext(gl);
    ctx.fillStyle = 'purple';
    ctx.fillRect(200, 200, 20, 30);
    const imgData = ctx.getImageData(200, 200, 1, 1);
    console.log('PURPLE COLOR : ');
    console.log(imgData.data);
  };
}
