import React, { FunctionComponent, useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { ArModel, NavigationLayout, UserModal } from '../../components';
import { retrieveActiveUser, User } from '../../store/UserManager';
import Models from '../../models/Models';

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
  const img = require('../../models/demo.glb');
  return <ArModel model={img} />;
  /* return (
    <NavigationLayout>
      <ScrollView>
        <ArModel />
        <Text>
          Hello
          {' '}
          {activeUser?.username}
        </Text>
        <ArModel model={Models.demo} />
        <UserModal />
      </ScrollView>
    </NavigationLayout>
  ); */
};

export default HomePage;
