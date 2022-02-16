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
  MeshBasicMaterial,
} from 'three';
import { Asset } from 'expo-asset';
import { MonkeyZones, RhinoZones, SnakeZones } from '../canvas';

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
  SNAKE = 'Snake',
  // eslint-disable-next-line no-unused-vars
  MONKEY = 'Monkey',
  // eslint-disable-next-line no-unused-vars
  RHINOCEROS = 'Rhinoceros',
}

interface Props {
  colors: RhinoZones | SnakeZones | MonkeyZones,
  model: ModelsEnum,
}

/**
 * @name ArModel
 * @param {RhinoZones | SnakeZones | MonkeyZones} colors  The model colors.
 * @param {ModelsEnum} model  The model to display.
 * @constructor
 */
const ArModel: FunctionComponent<Props> = ({ colors, model }) => {
  let timeout: number;
  const models = {
    Snake: require('./models/rhino.glb'),
    Monkey: require('./models/rhino.glb'),
    Rhinoceros: require('./models/rhino.glb'),
  };

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

        // lights
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
            currentModel.traverse((child) => {
              // find the zone of the child object 3d
              const affiliatedZone = Object.keys(colors).find(
                (colorZone) => colorZone === child.name,
              );
              // if obj contains a material, update it texture
              if (child.material && affiliatedZone) {
                // setup detected color and affiliate it
                const childMaterial = new MeshBasicMaterial({
                  color: `rgb(${colors[child.name][0]},${colors[child.name][1]},${colors[child.name][2]})`,
                });
                // eslint-disable-next-line no-param-reassign
                child.material = childMaterial;
              }
            });
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

        let swipeDirection = 'left';
        function update() {
          if (currentModel) {
            if (swipeDirection === 'left') {
              if (currentModel.rotation.y > 0.25) {
                swipeDirection = 'right';
              } else {
                currentModel.rotation.y += 0.004;
              }
            } else if (swipeDirection === 'right') {
              if (currentModel.rotation.y < -0.25) {
                swipeDirection = 'left';
              } else {
                currentModel.rotation.y -= 0.004;
              }
            }
          }
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
