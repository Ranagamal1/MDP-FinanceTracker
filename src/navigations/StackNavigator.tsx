import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TransactionsScreens} from './Stack';

const StackNavigator = createStackNavigator();
export const StackNavigatorScreen: FC = () => {
  return (
    <>
      <NavigationContainer>
        <StackNavigator.Navigator screenOptions={{headerShown: false}}>
          <StackNavigator.Screen
            name="TransactionsList"
            component={TransactionsScreens}
            options={{headerShown: false}}
          />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </>
  );
};
