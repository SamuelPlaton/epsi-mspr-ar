import React, { FunctionComponent, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { UserForm, Modal } from '../../../components';

/**
 * UserModal.
 * @constructor
 */
const UserModal: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFormSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Open modal only if wifi is accessible
  NetInfo.addEventListener((networkState) => {
    if (isOpen !== networkState.isConnected && !isFormSubmitted) {
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
