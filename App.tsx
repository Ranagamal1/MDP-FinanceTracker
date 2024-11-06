/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StackNavigatorScreen} from './src/navigations/StackNavigator';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      {Platform.OS === 'ios' && (
        <StatusBar translucent barStyle="dark-content" />
      )}
      <StackNavigatorScreen />
    </SafeAreaView>
  );
}

export default App;
