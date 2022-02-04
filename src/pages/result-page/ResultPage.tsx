import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Dimensions, Pressable, ScrollView, StyleSheet, Text, View, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';
import { Button, NavigationLayout } from '../../components';
import { retrieveActiveUser, User } from '../../store/UserManager';

/**
 * Result Page.
 * @constructor
 */
const ResultPage: FunctionComponent<any> = ({ route }) => {
  const nav = useNavigation();
  const { screenUri } = route.params;
  // retrieve active user
  const [activeUser, setActiveUser] = useState<User | undefined>();

  useEffect(() => {
    retrieveActiveUser(setActiveUser);
  }, []);

  const download = () => {};
  const share = async () => {
    console.log('TEST');
    const result = await Share.open(shareOptions);
    console.log('RESULT : ', result);
  };
  const base64image = Buffer.from(screenUri).toString('base64');
  const shareOptions = {
    title: 'Dessin',
    url: screenUri,
    message: 'Hey !',
    subject: 'Subject',
  };

  console.log(shareOptions);
  return (
    <NavigationLayout>
      <ScrollView>
        <View style={styles.container}>
          <Image source={{ uri: screenUri }} style={styles.image} />
          <Text style={styles.message}>
            Nice picture
            {activeUser && (
              <Text style={styles.user}>
                {' '}
                {activeUser?.username}
              </Text>
            )}
            , ready to share it ?
          </Text>
          <Pressable onPress={() => nav.goBack()}>
            <Text style={styles.retryButton}>Take another one</Text>
          </Pressable>
          <View style={styles.button}>
            <Button onPress={download} title="DOWNLOAD" />
          </View>
          <View style={styles.button}>
            <Button onPress={share} title="SHARE" />
          </View>
        </View>
      </ScrollView>
    </NavigationLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    padding: 40,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 2,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 3.2,
  },
  user: {
    color: '#FAB915',
  },
  message: {
    marginTop: '10%',
    alignSelf: 'center',
    fontSize: 20,
  },
  retryButton: {
    color: '#06D5C6',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
  },
});
export default ResultPage;
