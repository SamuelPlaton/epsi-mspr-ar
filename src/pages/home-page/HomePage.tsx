import React, { FunctionComponent } from 'react';
import { ScrollView, Text } from 'react-native';
import { NavigationLayout } from '../../components';

/**
 * Home Page.
 * @constructor
 */
const HomePage: FunctionComponent = () => (
  <NavigationLayout>
    <ScrollView>
      <Text>Hello</Text>
    </ScrollView>
  </NavigationLayout>
);

export default HomePage;
