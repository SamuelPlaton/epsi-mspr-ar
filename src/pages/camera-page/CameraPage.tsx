import React, { FunctionComponent, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CameraLayout, Camera } from '../../components';
/**
 * Camera Page.
 * @constructor
 */
const CameraPage: FunctionComponent = () => {
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <CameraLayout>
      <ScrollView>
        { isFocused && !refresh && <Camera onRefresh={() => setRefresh(true)} />}
      </ScrollView>
    </CameraLayout>
  );
};

export default CameraPage;
