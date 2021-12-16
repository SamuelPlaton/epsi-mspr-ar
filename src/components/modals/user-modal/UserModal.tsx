import React, { FunctionComponent, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Constants from 'expo-constants';
import { UserForm, Modal } from '../../../components';

/**
 * UserModal.
 * @constructor
 */
const UserModal: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFormSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { enableUserRegistration } = Constants.manifest.extra;
  // Open modal only if wifi is accessible and user registration is enabled
  NetInfo.addEventListener((networkState) => {
    if (isOpen !== networkState.isConnected && !isFormSubmitted && enableUserRegistration) {
      setIsOpen(networkState.isConnected);
    }
  });

  const handleClose = () => {
    setIsOpen(false);
    setFormSubmitted(true);
  };

  return (
    <Modal isVisible={isOpen && !isFormSubmitted}>
      <UserForm onClose={handleClose} />
    </Modal>
  );
};

export default UserModal;
