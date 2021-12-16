import React, { FunctionComponent, useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import {
  ArModel,
  NavigationLayout, UserModal,
} from '../../components';
import { retrieveActiveUser, User } from '../../store/UserManager';

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
  /*return (
    <NavigationLayout>
      <ScrollView>
        <ArModel />
        <Text>
          Hello
          {' '}
          {activeUser?.username}
        </Text>
        <UserModal />
      </ScrollView>
    </NavigationLayout>
  );*/
  return <ArModel/>;
};

export default HomePage;
