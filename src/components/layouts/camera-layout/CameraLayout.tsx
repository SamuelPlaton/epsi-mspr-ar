import React, { FunctionComponent } from 'react';
import {
  Image, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../../images';
import { genericStyles } from '../../../styles';

/**
 * @name CameraLayout
 * @description Action in camera page.
 * @param children
 * @constructor
 */
const CameraLayout: FunctionComponent = ({ children }) => {
  // Our custom component style
  const styles = StyleSheet.create({
    header: {
      paddingLeft: 30,
      paddingTop: 50,
      position: 'absolute',
      zIndex:2,

    },
    appLogo: {
      width: 40,
      height: 30,
      position: 'relative',
    },

  });

  const nav = useNavigation();
  // Navigate user to a specified link
  const navigate = (link: string) => {
    nav.navigate(link);
  };

  return (
    <View>
      <View style={{ ...styles.header}}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigate('Home')}>
          <Image source={Images.back} style={styles.appLogo} />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

export default CameraLayout;
