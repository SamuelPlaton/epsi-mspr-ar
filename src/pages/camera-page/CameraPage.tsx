import React, { FunctionComponent } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CameraLayout, Camera } from '../../components';

/**
 * Camera Page.
 * @constructor
 */
const CameraPage: FunctionComponent = () => {
  const isFocused = useIsFocused();
  return (
    <CameraLayout>
      <ScrollView>
        { isFocused && <Camera />}
      </ScrollView>
    </CameraLayout>
  );
};

export default CameraPage;
