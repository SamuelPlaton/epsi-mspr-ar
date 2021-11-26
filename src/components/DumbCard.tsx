import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const BaseCard: FunctionComponent = function ({ children }) {
  return (
    <View>
      {children}
    </View>
  );
};

export default BaseCard;
