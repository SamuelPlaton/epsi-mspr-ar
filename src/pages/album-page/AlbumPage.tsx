import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Dimensions, Image, Pressable, ScrollView, StyleSheet, View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { NavigationLayout } from '../../components';

/**
 * Result Page.
 * @constructor
 */
const AlbumPage: FunctionComponent<any> = () => {
  const [imagesUri, setImages] = useState([]);
  const nav = useNavigation();

  useEffect(() => {
    getPics();
  }, []);
  // eslint-disable-next-line consistent-return
  const getPics = async () => {
    try {
      const album = await MediaLibrary.getAlbumAsync('draw-it');
      MediaLibrary.getAssetsAsync({
        album,
      }).then((media) => {
        const array = [];
        media.assets.forEach((asset) => {
          array.push(asset.uri);
        });
        setImages(array);
      });
    } catch (error) {
      return error;
    }
  };
  return (
    <NavigationLayout>
      <ScrollView>
        <View style={styles.container}>
          {imagesUri.map((uriImg) => (
            <Pressable onPress={() => nav.navigate('Result', { screenUri: uriImg })}>
              <Image source={{ uri: uriImg }} key={uriImg} style={styles.image} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </NavigationLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').height / 6,
    display: 'flex',
    margin: 5,
  },
});
export default AlbumPage;
