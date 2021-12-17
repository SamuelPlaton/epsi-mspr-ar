import React, { FunctionComponent, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import {
  NavigationLayout, UserModal,
} from '../../components';
import { retrieveActiveUser, User } from '../../store/UserManager';
import { useNavigation } from '@react-navigation/native';

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
  const nav = useNavigation();
  // Navigate user to a specified link
  const navigate = (link: string) => {
    nav.navigate(link);
  };
  return (
    <NavigationLayout>
      <ScrollView>
        <TouchableOpacity activeOpacity={1} onPress={() => navigate('Camera')}>
          <Text>
            Scan Me
          </Text>
        </TouchableOpacity>
        <Text>
          Hello
          {' '}
          {activeUser?.username}
        </Text>
        <UserModal />
      </ScrollView>
    </NavigationLayout>
  );
};

export default HomePage;
