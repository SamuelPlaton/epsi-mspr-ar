import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Dimensions, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  NavigationLayout, UserModal,Button,
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
  const nav = useNavigation();
  // Navigate user to a specified link
  const navigate = (link: string) => {
    nav.navigate(link);
  };
  return (
    <NavigationLayout>
      <ScrollView>
        <Text style={styles.message}>
          Hello
          {' '}
          <Text style={styles.user}>
            {activeUser?.username}
          </Text>
          , ready to draw?
        </Text>
        <View style={styles.button}>
          <Button onPress={() => navigate('Camera')} title="Scan your draw" />
        </View>
        <UserModal />
      </ScrollView>
    </NavigationLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height,
  },
  user: {
    color: '#FAB915',
  },
  message: {
    marginTop: '10%',
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    marginTop: '40%',
    justifyContent: 'center',
    alignSelf: 'center',

  },
});
export default HomePage;
