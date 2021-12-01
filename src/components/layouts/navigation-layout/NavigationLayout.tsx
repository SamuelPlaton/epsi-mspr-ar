import React, { FunctionComponent } from 'react';
import {
  Image, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../../images';
import { genericStyles } from '../../../styles';

/**
 * @name NavigationLayout
 * @description Header of our app.
 * @param children
 * @constructor
 */
const NavigationLayout: FunctionComponent = ({ children }) => {
  // Our custom component style
  const styles = StyleSheet.create({
    header: {
      width: '100%',
      backgroundColor: '#F4A8CC',
      paddingTop: 40,
      paddingLeft: 30,
      paddingRight: 30,
      height: 130,
      borderBottomWidth: 2,
      borderBottomColor: 'black',
    },
    appLogo: {
      width: 140,
      height: 30,
    },
  });

  const nav = useNavigation();
  // Navigate user to a specified link
  const navigate = (link: string) => {
    nav.navigate(link);
  };

  return (
    <View>
      <View style={{ ...styles.header, ...genericStyles.rowBetween }}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigate('Home')}>
          <Image source={Images.companyLogo} style={genericStyles.iconMedium} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => navigate('Home')}>
          <Image source={Images.appLogo} style={styles.appLogo} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => navigate('Info')}>
          <Image source={Images.settings} style={genericStyles.iconMedium} />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

export default NavigationLayout;
