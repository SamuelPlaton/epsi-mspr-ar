import React, { FunctionComponent } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CameraLayout, Camera } from '../../components';
import { default as Context } from './Context';
/**
 * Camera Page.
 * @constructor
 */
const CameraPage: FunctionComponent = () => {
  const isFocused = useIsFocused();
  return <Context />;
  return (
    <CameraLayout>
      <ScrollView>
        { isFocused && <Context />}
      </ScrollView>
    </CameraLayout>
  );
};

export default CameraPage;
