import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomePage, InfoPage } from '../pages';

const Stack = createNativeStackNavigator();

/**
 * @name Router
 * @description Our React Native App Router.
 * @constructor
 */
const Router: FunctionComponent = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="Info" component={InfoPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default Router;
