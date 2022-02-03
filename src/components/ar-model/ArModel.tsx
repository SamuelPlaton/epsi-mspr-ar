import { decode, encode } from 'base-64';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import React, { FunctionComponent, useEffect } from 'react';
import {
  AmbientLight,
  Group,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
} from 'three';
import { Asset } from 'expo-asset';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

let currentModel: Group;

// eslint-disable-next-line no-shadow
export enum ModelsEnum {
  // eslint-disable-next-line no-unused-vars
  SNAKE = 'snake',
  // eslint-disable-next-line no-unused-vars
  MONKEY = 'monkey',
  // eslint-disable-next-line no-unused-vars
  RHINOCEROS = 'rhinoceros',
}

interface Props {
  model: ModelsEnum,
}

/**
 * @name ArModel
 * @param {ModelsEnum} model  The model to display.
 * @constructor
 */
const ArModel: FunctionComponent<Props> = ({ model }) => {
  console.log('AR MODEL');
  console.log(model);
  let timeout: number;
  const models = {
    Snake: require('./models/v_knife_karam.gltf'),
    Monkey: require('./models/v_knife_karam.gltf'),
    Rhinoceros: require('./models/v_knife_karam.gltf'),
  };
  console.log(models[model]);
  useEffect(() => () => clearTimeout(timeout), []);

  return (
    <GLView
      style={{ flex: 1, zIndex: 101 }}
      onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);

        const camera = new PerspectiveCamera(120, width / height, 0.01, 1000);
        camera.position.z = 5;
        camera.position.y = 1.5;
        const asset = Asset.fromModule(
          models[model],
        );
        await asset.downloadAsync();
        const scene = new Scene();

        const ambientLight = new AmbientLight(0x101010);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 200, 200);
        scene.add(pointLight);

        const spotLight = new SpotLight(0xffffff, 0.5);
        spotLight.position.set(0, 500, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);

        const loader = new GLTFLoader();
        loader.load(
          asset.uri || '',
          (gltf) => {
            currentModel = gltf.scene;
            scene.add(currentModel);
          },
          (xhr) => {
            // eslint-disable-next-line no-console
            console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
          },
          (error) => {
            // eslint-disable-next-line no-console
            console.error('An error happened', error);
          },
        );

        function update() {
          if (currentModel) currentModel.rotation.y += 0.004;
        }

        const render = () => {
          timeout = requestAnimationFrame(render);
          update();
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        render();
      }}
    />
  );
};

export default ArModel;
