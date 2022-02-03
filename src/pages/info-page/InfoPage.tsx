import React, { FunctionComponent } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { NavigationLayout } from '../../components';

/**
 * Info Page
 * @constructor
 */
const InfoPage: FunctionComponent = () => (
  <NavigationLayout>
    <ScrollView style={styles.container}>
      <Text style={styles.cgu}>
        The general conditions of use of
        the application are available on the Cerealis website.
      </Text>
      <Text>For any request, please send an email to contact@cerealis.com</Text>
    </ScrollView>
  </NavigationLayout>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cgu: {
    marginBottom: 10,
  },
});
export default InfoPage;
