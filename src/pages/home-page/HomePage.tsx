import React, { FunctionComponent, useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import {
  NavigationLayout, UserModal,
} from '../../components';
import { retrieveActiveUser, User } from '../../store/UserManager';
import CameraComponent from '../../components/cameras/Camera';

/**
 * Home Page.
 * @constructor
 */
const HomePage: FunctionComponent = () => {
  // retrieve active user
  const [activeUser, setActiveUser] = useState<User | undefined>();
  useEffect(() => {
    retrieveActiveUser(setActiveUser);
  }, []);
  return (
    <NavigationLayout>
      <ScrollView>
        <UserModal />
        <CameraComponent />
      </ScrollView>
    </NavigationLayout>
);
};
export default HomePage;
