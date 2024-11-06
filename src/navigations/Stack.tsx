import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import BottomTabNavigator from './BottomTabNavigator';

const TransactionsStack = createStackNavigator();
const HomeWrapper = () => {
  return <BottomTabNavigator />;
};
export const TransactionsScreens: FC = () => {
  return (
    <TransactionsStack.Navigator
      screenOptions={{headerShown: false, headerTitle: ''}}
      initialRouteName="Home">
      <TransactionsStack.Screen
        name="Home"
        component={HomeWrapper}
        options={{headerShown: false}}
      />
    </TransactionsStack.Navigator>
  );
};
