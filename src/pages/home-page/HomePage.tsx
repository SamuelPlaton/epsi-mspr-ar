import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, NavigationLayout, UserModal } from '../../components';
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
          {activeUser && (
            <Text style={styles.user}>
              {' '}
              {activeUser?.username}
            </Text>
          )}
          , ready to draw?
        </Text>
        <View style={styles.button}>
          <Button onPress={() => navigate('Camera')} title="Scan your draw" />
        </View>
        <UserModal onSubmit={() => retrieveActiveUser(setActiveUser)} />
      </ScrollView>
    </NavigationLayout>
  );
};
const styles = StyleSheet.create({
  user: {
    color: '#FAB915',
  },
  message: {
    marginTop: '20%',
    alignSelf: 'center',
    fontSize: 20,
  },
  button: {
    flex: 1,
    marginTop: '40%',
    justifyContent: 'center',
    alignSelf: 'center',

  },
});
export default HomePage;
