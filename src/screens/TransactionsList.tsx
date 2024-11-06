/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import {Spacer} from '../components/Spacer';
import {
  HorizontalContainer,
  VerticalContainer,
} from '../components/StyledComponents';
import TransactionsComponent from './TransactionsComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Label from '../components/Label';
import {View} from 'react-native';
import CustomSort from '../components/CustomSort';

const StyledContaier = styled.View`
  flex: 1;
  height: 100%;
  background-color: #1b58d1;
`;

export const TransactionsList: FC = () => {
  const [currentTransactions, setcurrentTransactions] =
    useState<any>(undefined);
  const [selectedType, setselectedType] = useState('All');
  const [Option, setOption] = useState('filter');

  const isFocused = useIsFocused();
  const getAllTransactions = async () => {
    const allData = await AsyncStorage.getItem('transactions');
    if (allData !== null) {
      setcurrentTransactions(JSON.parse(allData));
    } else {
      setcurrentTransactions([]);
    }
  };
  const getFilteredTransactions = async () => {
    const allData = await AsyncStorage.getItem('transactions');
    if (allData !== null) {
      const parsedData = JSON.parse(allData);

      if (Option === 'sort') {
        // Sort transactions by date
        const sortedData = parsedData.sort((a, b) => {
          if (selectedType === 'Oldest') {
            return new Date(a.date) - new Date(b.date);
          } else {
            return new Date(b.date) - new Date(a.date);
          }
        });
        setcurrentTransactions(sortedData);
      } else {
        const filteredData = parsedData.filter(x => {
          return selectedType === 'All' || x.type === selectedType;
        });
        setcurrentTransactions(filteredData);
      }
    } else {
      setcurrentTransactions([]);
    }
  };
  useEffect(() => {
    getAllTransactions();
  }, [isFocused]);
  useEffect(() => {
    getFilteredTransactions();
  }, [Option, selectedType]);

  const fadeListAnim = useRef(new Animated.Value(0.8)).current;
  const [data, setData] = useState(
    Array.from({length: 30}, (_, index) => `Item ${index + 1}`),
  );
  const fadeAnim = useRef(data.map(() => new Animated.Value(0))).current;

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: fadeAnim[0]}}}],
    {useNativeDriver: false},
  );
  React.useEffect(() => {
    Animated.timing(fadeListAnim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeListAnim]);
  return (
    <StyledContaier>
      <VerticalContainer
        style={{
          padding: 15,
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 20,
        }}>
        <Label fontSize={22} color="#fff">
          Transactions
        </Label>
        <Spacer direction="vertical" size="smaller" />
        <HorizontalContainer style={{width: '90%'}}>
          <CustomSort
            type="sort"
            SelectedType={type => {
              setOption('sort');
              setselectedType(type);
            }}
          />
          <Spacer direction="horizontal" size="large" />
          <CustomSort
            type="filter"
            SelectedType={type => {
              setOption('filter');
              setselectedType(type);
            }}
          />
        </HorizontalContainer>
      </VerticalContainer>
      <VerticalContainer style={styles.InnerView}>
        {currentTransactions === undefined ? (
          <HorizontalContainer
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              top: '50%',
            }}>
            <ActivityIndicator size="large" color="green" />
          </HorizontalContainer>
        ) : currentTransactions.length !== 0 ? (
          <Animated.View style={{flex: 1, opacity: fadeListAnim}}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={currentTransactions}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              ItemSeparatorComponent={() => (
                <Spacer direction="vertical" size="smaller" />
              )}
              renderItem={({item}) => (
                <ScrollView>
                  <TransactionsComponent data={item} />
                </ScrollView>
              )}
            />
          </Animated.View>
        ) : (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Label fontSize={14} bold color="green">
              No Transactions to show
            </Label>
          </View>
        )}
      </VerticalContainer>
    </StyledContaier>
  );
};

export default TransactionsList;
const styles = StyleSheet.create({
  InnerView: {
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
    marginTop: 10,
    height: '100%',
    paddingBottom: '57%',
  },
  options: {
    width: '40%',
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
