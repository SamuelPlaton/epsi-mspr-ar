import React, { FunctionComponent } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  onPress: () => void;
  title: string,
}
/**
 * The react Button component.
 */
const ButtonComponent: FunctionComponent<Props> = ({ onPress, title }) => {
  const styles = StyleSheet.create({
    button: {
      borderWidth: 2,
      borderColor: 'black',
      backgroundColor: '#91E9F0',
      padding: 5,
      width: 175,
      height: 40,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
      color: 'white',
    },
  });
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default ButtonComponent;
