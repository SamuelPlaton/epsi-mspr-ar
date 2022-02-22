import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Dimensions, Pressable, ScrollView, StyleSheet, Text, View, Image, Alert,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';
import { Button, NavigationLayout, UserModal } from '../../components';
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

  /**
   * @name download
   * @description Download the image and store it in media galery.
   */
  const download = async () => {
    const asset = await MediaLibrary.createAssetAsync(screenUri);
    const album = await MediaLibrary.getAlbumAsync('draw-it');
    if (album) {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      const album = await MediaLibrary.getAlbumAsync('draw-it');
      MediaLibrary.getAssetsAsync({ album: album });
    } else {
      await MediaLibrary.createAlbumAsync('draw-it', asset, false);
    }
    Alert.alert('Succès', 'Image téléchargée avec succès !');
  };

  /**
   * @name share
   * @description Share the image in the selected social media.
   */
  const share = async () => {
    await Sharing.shareAsync(screenUri, { dialogTitle: 'Share your image' });
  };

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
        <UserModal onSubmit={() => retrieveActiveUser(setActiveUser)} />
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
