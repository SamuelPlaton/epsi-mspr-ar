import React, { FunctionComponent } from 'react';
import { ScrollView } from 'react-native';
import { CameraLayout, Camera } from '../../components';

/**
 * Camera Page.
 * @constructor
 */
const CameraPage: FunctionComponent = () => {
  return (
    <CameraLayout>
      <ScrollView>
        <Camera />
      </ScrollView>
    </CameraLayout>
  );
};
export default CameraPage;
