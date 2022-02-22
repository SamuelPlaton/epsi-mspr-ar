import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  CameraPage, HomePage, InfoPage, ResultPage,AlbumPage
} from '../pages';

const Stack = createNativeStackNavigator();

/**
 * @name Router
 * @description Our React Native App Router.
 * @constructor
 */
const Router: FunctionComponent = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="Info" component={InfoPage} options={{ headerShown: false }} />
      <Stack.Screen name="Camera" component={CameraPage} options={{ headerShown: false }} />
      <Stack.Screen name="Result" component={ResultPage} options={{ headerShown: false }} />
      <Stack.Screen name="Album" component={AlbumPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default Router;
