import React, { FunctionComponent } from 'react';
import { ScrollView, Text } from 'react-native';
import { NavigationLayout } from '../../components';

const InfoPage: FunctionComponent = () => (
  <NavigationLayout>
    <ScrollView>
      <Text>Info page</Text>
    </ScrollView>
  </NavigationLayout>
);

export default InfoPage;
