import React, { FunctionComponent, useState } from 'react';
import {
  Text, View, TextInput,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { genericStyles } from '../../../styles';
import { Button } from '../../buttons';
import { storeActiveUser } from '../../../store/UserManager';

interface Props {
  onClose: () => void;
}
/**
 * The react UserForm component.
 */
const UserForm: FunctionComponent<Props> = ({ onClose }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [usernameFocused, setUsernameFocused] = useState<boolean>(false);
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const submit = () => {
    axios.post(`${Constants.manifest.extra.cmsUrl}/api/user-datas`, { data: { username, email } }).then((response) => {
      // eslint-disable-next-line no-console
      console.log(response.data.data);
      storeActiveUser({ username, email }).then(() => onClose());
      onClose();
      // eslint-disable-next-line no-console
    }).catch((e) => console.error(e));
  };

  return (
    <View style={genericStyles.container}>
      <Text style={genericStyles.titleText}>User Informations</Text>
      <Text style={genericStyles.label}>Surname</Text>
      <TextInput
        value={username}
        onChangeText={(value) => setUsername(value)}
        placeholderTextColor="#999999"
        style={{ ...genericStyles.input, borderColor: usernameFocused ? '#06A8B3' : 'black' }}
        onPressIn={() => setUsernameFocused(true)}
        onEndEditing={() => setUsernameFocused(false)}
      />
      <Text style={genericStyles.label}>Email</Text>
      <TextInput
        value={email}
        keyboardType="email-address"
        onChangeText={(value) => setEmail(value)}
        placeholderTextColor="#999999"
        style={{ ...genericStyles.input, borderColor: emailFocused ? '#06A8B3' : 'black' }}
        onPressIn={() => setEmailFocused(true)}
        onEndEditing={() => setEmailFocused(false)}
      />
      <Button title="SUBMIT" onPress={submit} />
    </View>
  );
};

export default UserForm;
