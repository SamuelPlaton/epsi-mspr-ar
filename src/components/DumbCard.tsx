import React, { FunctionComponent, UseEffect } from 'react';
import { View } from 'react-native';

const BaseCard: FunctionComponent = ({ children }) => (
  <View>
    {children}
  </View>
);

export default BaseCard;
