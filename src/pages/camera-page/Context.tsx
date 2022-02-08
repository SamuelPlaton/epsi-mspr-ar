import { GLView } from 'expo-gl';
import React from 'react';
import { View, Text } from 'react-native';
import Expo2DContext from 'expo-2d-context';
import { Asset } from 'expo-asset';

export default class Context extends React.Component {
  render() {
    return (
      <GLView
        style={{
          flex: 1, width: 1000, height: 1000, zIndex: 200,
        }}
        onContextCreate={this._onGLContextCreate}
      />
    );
  }

  // example here : https://www.npmjs.com/package/expo-2d-context
  _onGLContextCreate = async (gl) => {
    const ctx = new Expo2DContext(gl);
    const asset = Asset.fromModule(require('./dog.png'));
    const dlAsset = await asset.downloadAsync();
    const pattern = ctx.createPattern(dlAsset, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(200, 200, 200, 300);
    ctx.stroke();
    ctx.flush();
    const imgData = ctx.getImageData(200, 200, 1, 1);
    console.log('PURPLE COLOR : ');
    console.log(imgData.data);
    const viewData = ctx.getImageData(100, 100, 1, 1);
    console.log('RED COLOR : ');
    console.log(viewData.data);
    return gl;
  };
}
