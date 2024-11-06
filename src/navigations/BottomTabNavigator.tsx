/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Label from '../components/Label';
import {StyleSheet} from 'react-native';
import TransactionsList from '../screens/TransactionsList';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Summary from '../screens/Summary';
import TransactionsForm from '../screens/TransactionsForm';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="TransactionsList"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarInactiveTintColor: 'red',
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: '#1b58d1',
        tabBarLabel: ({focused}) => {
          return (
            <Label color={focused ? '#1b58d1' : 'black'} fontSize={13}>
              {route.name}
            </Label>
          );
        },
        tabBarIcon: ({focused}) => {
          if (route.name === 'TransactionsList') {
            if (focused) {
              return <Icon name="list" color="#1b58d1" size={18} />;
            } else {
              return <Icon name="list" size={15} />;
            }
          } else if (route.name === 'Summary') {
            if (focused) {
              return <Icon name="clipboard-list" color="#1b58d1" size={18} />;
            } else {
              return <Icon name="clipboard-list" size={15} />;
            }
          } else if (route.name === 'Add') {
            if (focused) {
              return <Icon name="plus-circle" color="#1b58d1" size={18} />;
            } else {
              return <Icon name="plus-circle" size={15} />;
            }
          }
        },
      })}>
      <Tab.Screen
        name="TransactionsList"
        component={TransactionsList}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Summary"
        component={Summary}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen name="Add" component={TransactionsForm} />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderTopWidth: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: 71,
  },
});
