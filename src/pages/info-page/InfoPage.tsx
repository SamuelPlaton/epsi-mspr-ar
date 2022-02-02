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
        Les Conditions générales d'utilisations de
        l'application sont disponibles sur le site de Cerealis.
      </Text>
      <Text>Pour toute demande, veuillez envoyer un mail à contact@cerealis.fr</Text>
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
