import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  isVisible: boolean;
}

/**
 * The react modal component.
 */
const ModalComponent: FunctionComponent<Props> = ({ children, isVisible }) => {
  const styles = StyleSheet.create({
    content: {
      flex: 1,
      alignContent: 'flex-start',
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      borderWidth: 2,
      borderColor: 'black',
      maxHeight: '75%',
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  });

  return (
    <Modal
      testID="modal"
      isVisible={isVisible}
      backdropColor="#B4B3DB"
      backdropOpacity={0.8}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
    >
      <View style={styles.content}>
        {children}
      </View>
    </Modal>
  );
};

export default ModalComponent;
