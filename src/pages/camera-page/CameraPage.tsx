import React, { FunctionComponent } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CameraLayout, Camera } from '../../components';
import { default as Context } from './Context';
import {Screen} from "react-native-screens";
/**
 * Camera Page.
 * @constructor
 */
const CameraPage: FunctionComponent = () => {
  const isFocused = useIsFocused();
  //return <ScrollView/>;
  //return <Context src="./dog.png" />;
  return (
    <CameraLayout>
      <ScrollView>
        { isFocused && <Camera />}
      </ScrollView>
    </CameraLayout>
  );
};

export default CameraPage;
