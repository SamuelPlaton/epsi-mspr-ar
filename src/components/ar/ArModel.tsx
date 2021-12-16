import { Asset } from 'expo-asset';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import ExpoTHREE, { THREE } from 'expo-three';
import React, { FunctionComponent } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// see doc https://github.com/expo/expo-three/blob/master/README.md#usage
global.THREE = global.THREE || THREE;
/**
 * ArModel.
 * @constructor
 */
const ArModel: FunctionComponent = () => {
  console.log('Ar Model refreshed');
  //THREE.suppressExpoWarnings();

  const init = async (gl: ExpoWebGLRenderingContext) => {
    const scene = new THREE.Scene();
    console.log(gl.drawingBufferWidth);
    console.log(gl.drawingBufferHeight);
    const camera = new THREE.PerspectiveCamera(150, gl.drawingBufferWidth / gl.drawingBufferHeight, 1, 1000);
    const renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(0x10505b);
    // Define our shape (Below is a tetrahedron, but can be whatever)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // Define the material, Below is material with hex color #00ff00
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // Define the full 3-D object
    const objectToRender = new THREE.Mesh(geometry, material);
    // Specifying the cameras Z position will allow the object to appear in front of the camera rather that in line (which the camera which is the default)
    camera.position.z = 5;
    camera.position.x = 1;
    camera.position.y = 1;
    // display object
    const asset = Asset.fromModule(require('./character.obj'));
    await asset.downloadAsync();
    const uri = asset.localUri;
    const loader = new OBJLoader();
    console.log('URI : ', uri);
    loader.load(uri, (group) => {
      console.log('onLoad');
      scene.add(group.scene);
    }, () => console.log('onProgress'), () => console.log('onError'));
    scene.add(objectToRender);

    renderer.render(scene, camera);
    gl.endFrameEXP();
    console.log('Render over');
  };

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={(gl: ExpoWebGLRenderingContext) => init(gl)}
      onTouchStart={() => console.log('Touch started')}
    />
  );
};

export default ArModel;
