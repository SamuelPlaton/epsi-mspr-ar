import { Asset } from 'expo-asset';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import ExpoTHREE, { THREE } from 'expo-three';
import React, { FunctionComponent } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Models from '../../models/Models';
// see doc https://github.com/expo/expo-three/blob/master/README.md#usage
global.THREE = global.THREE || THREE;

interface Props {
model: Models;
}
/**
 * ArModel.
 * @constructor
 */
const ArModel: FunctionComponent<Props> = ({ model }) => {
  const init = async (gl: ExpoWebGLRenderingContext) => {
    // setup scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, gl.drawingBufferWidth / gl.drawingBufferHeight, 1, 1000);
    const renderer = new ExpoTHREE.Renderer({ gl });
    // setup renderer size
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x10505b);
    // Specifying the cameras Z position will allow the object to appear in front of the camera rather that in line (which the camera which is the default)
    camera.position.z = 5;
    camera.position.x = 1;
    camera.position.y = 1;
    // add light to the scene
    const light = new THREE.PointLight(0xffffff, 2, 10);
    light.position.set(2, 2, 2);
    scene.add(light);
    // load object

    const model2 = require('../../models/demo.glb');
    console.log('model : ');
    console.log(model2);
    const asset = Asset.fromModule(model2);
    console.log('problem on download async : ');
    await asset.downloadAsync();
    const uri = asset.localUri;
    const loader = new GLTFLoader();
    loader.load(uri, (group) => {
      console.log('onLoad');
      scene.add(group.scene);
      // render object
      renderer.render(scene, camera);
    }, () => console.log('onProgress'), (e) => {
      console.log(e);
      console.log('onError');
    });
    gl.endFrameEXP();
  };

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={(gl: ExpoWebGLRenderingContext) => init(gl)}
    />
  );
};

export default ArModel;
