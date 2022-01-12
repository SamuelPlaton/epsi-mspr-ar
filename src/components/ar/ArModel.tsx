import { Asset } from 'expo-asset';
import { resolveAsync } from 'expo-asset-utils';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import ExpoTHREE, { THREE } from 'expo-three';
import React, { FunctionComponent } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { default as assetImported } from 'src/models/demo.glb';
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
  console.log('asset imported :');
  console.log(assetImported);
  const init = async (gl: ExpoWebGLRenderingContext) => {
    console.log('INIT');
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
    // Async load assets
    const assets = await Asset.loadAsync(assetImported);
    const asset = assets[0];
    // OR retrieve asset from module (but with no local URI)
    // const asset = await Asset.fromModule(assetImported);
    console.log('prepare assets : ');
    console.log(asset);
    // download asset (optional, asset var is enough) with expo-asset-utils
    const data = await resolveAsync({ uri: asset.uri });
    console.log('data : ', data);
    const loader = new GLTFLoader();
    // setup draco loader (optional)
    // const dracoLoader = new DRACOLoader();
    // loader.setDRACOLoader(dracoLoader);
    // as on mobile local uri is file://, we receive a console.warn
    // see https://github.com/mrdoob/three.js/blob/dev/src/loaders/FileLoader.js#L78
    loader.load(data.uri, (group) => {
      console.log('onLoad');
      scene.add(group.scene);
      // render object
      renderer.render(scene, camera);
    }, () => {
      console.log('onProgress');
    }, (e) => {
      console.log('onError :');
      console.log(e);
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
