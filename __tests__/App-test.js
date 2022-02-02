/**
 * @format
 */
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import App from '../App';
import { CameraPage } from '../src/pages';


describe('App', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });
  it('Display 3D model', () => {
    // Mock camera display
    jest.mock('react-native-camera', () => {
      const mockComponent = require('react-native/jest/mockComponent');
      return mockComponent('./drawing.jpg');
    });
    const data = renderer.create(<CameraPage />).toJSON();
    // Check that our 3D model is correctly returned
    expect(data).toContainAnyKeys('3d-model');
  })
})

