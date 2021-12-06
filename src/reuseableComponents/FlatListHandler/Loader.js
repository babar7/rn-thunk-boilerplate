import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#27aae1" />
  </View>
);

const styles = {
  container: {
    width: '100%',
    height: '100%',
    alignItem: 'center',
    justifyContent: 'center',
  },
};

export default Loader;
