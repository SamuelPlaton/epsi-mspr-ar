import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Dimensions, Image, ScrollView, StyleSheet, View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { NavigationLayout } from '../../components';
import { useNavigation } from '@react-navigation/native';

/**
 * Result Page.
 * @constructor
 */
const AlbumPage: FunctionComponent<any> =  () => {
  const [imagesUri, setImages] = useState( []);
  const nav = useNavigation();

  useEffect(() => {
    getPics();
  }, []);
  const getPics = async () => {
    try {
      const album = await MediaLibrary.getAlbumAsync('draw-it');
      MediaLibrary.getAssetsAsync({
          album: album
        }).then((media) => {
          let array=[];
            media.assets.forEach((asset) => {
               array.push(asset.uri);
            });
          setImages(array);
          });
    } catch (error) {
      console.log(error);
    }
  };

//
  return (
    <NavigationLayout>
      <ScrollView>
        <View style={styles.container}>
          {imagesUri.map((uriImg)=>{return <Image source={{ uri: uriImg}} key={uriImg} style={styles.image} /> })}
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
    flexWrap:"wrap",
    flexDirection:'row',
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width /4,
    height: Dimensions.get('window').height/6,
    display: 'flex',
  },
});
export default AlbumPage;
