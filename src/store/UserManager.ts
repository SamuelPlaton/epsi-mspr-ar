import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @name User
 * @description Our user interface
 */
export interface User {
  username: string;
  email: string;
}
// Async retrieve of our user
export const asyncRetrieveActiveUser = () => AsyncStorage.getItem('activeUser').then((response) => (response ? JSON.parse(response) : undefined));

// Sync retrieve of our user
export const retrieveActiveUser = async (action: any) => {
  const retrievedUser: User | undefined = await asyncRetrieveActiveUser();
  action(retrievedUser);
};

// Store our active user
export const storeActiveUser = async (user: User) => {
  await AsyncStorage.setItem('activeUser', JSON.stringify(user));
};
