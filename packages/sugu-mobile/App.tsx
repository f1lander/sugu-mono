import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const whiteColor = '#FFF';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: whiteColor,
    flex: 1,
    justifyContent: 'center',
  },
});

const App: React.FunctionComponent = function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
};

export default App;
