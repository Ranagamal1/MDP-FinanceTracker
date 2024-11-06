/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FC, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Svg} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Circle, VictoryLegend, VictoryPie} from 'victory-native';
import {
  HorizontalContainer,
  VerticalContainer,
} from '../components/StyledComponents';
import {Spacer} from '../components/Spacer';
import {colorPool} from '../Helpers/constants';
import {getMonthformat} from '../Helpers/helper';
import useFinancialData from '../Helpers/hooks';

export const Summary: FC = () => {
  const {
    totalIncome,
    setTotalIncome,
    totalExpenses,
    setTotalExpenses,
    Expenses,
    setExpenses,
    Selectedmonth,
    SelectedmonthName,
    updateMonth,
    monthsArray,
  } = useFinancialData();

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const allData = await AsyncStorage.getItem('transactions');
        if (allData) {
          const parsedData = JSON.parse(allData);
          // Get current month and year
          const currentDate = new Date();
          const currentMonth = Selectedmonth;

          const currentYear = currentDate.getFullYear();

          // Filter transactions for the selected month
          const currentMonthTransactions = parsedData.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return (
              getMonthformat(transactionDate.getMonth()).toString() ===
                currentMonth.toString() &&
              transactionDate.getFullYear() === currentYear
            );
          });
          const income = currentMonthTransactions.reduce((acc, transaction) => {
            return transaction.type === 'Income'
              ? acc + transaction.amount
              : acc;
          }, 0);
          const expenses = currentMonthTransactions.reduce(
            (acc, transaction) => {
              return transaction.type === 'Expense'
                ? acc + transaction.amount
                : acc;
            },
            0,
          );
          const expensesByCategory = currentMonthTransactions.reduce(
            (acc, transaction) => {
              if (transaction.type === 'Expense') {
                if (!acc[transaction.category]) {
                  acc[transaction.category] = 0;
                }
                acc[transaction.category] += transaction.amount;
              }
              return acc;
            },
            {},
          );
          const pieData = Object.keys(expensesByCategory).map(
            (category, index) => ({
              x: category,
              y: expensesByCategory[category],
              color: colorPool[index % colorPool.length],
            }),
          );
          setTotalIncome(income);
          setTotalExpenses(expenses);
          setExpenses(pieData);
        }
      } catch (error) {
        console.error('Failed to load transactions:', error);
      }
    };

    loadTransactions();
  }, [Selectedmonth]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions Summary for Current Month</Text>
      <HorizontalContainer
        style={{alignSelf: 'center', width: '100%', justifyContent: 'center'}}>
        <SelectDropdown
          data={monthsArray}
          onSelect={selectedItem => {
            updateMonth(selectedItem.number);
          }}
          renderButton={() => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {SelectedmonthName}
                </Text>
                <Icon name="chevron-down" color="#fff" size={18} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && {backgroundColor: '#D2D9DF'}),
                }}>
                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </HorizontalContainer>
      <Spacer direction="vertical" size="small" />
      <View style={styles.summaryContainer}>
        <HorizontalContainer>
          <Text style={styles.plussigns}>+</Text>
          <Spacer direction="horizontal" size="smaller" />
          <VerticalContainer>
            <Text style={styles.summaryincomeText}>
              {totalIncome.toFixed(2)}$
            </Text>
            <Text style={styles.summaryText}>Income</Text>
          </VerticalContainer>
        </HorizontalContainer>
        <HorizontalContainer>
          <Text style={styles.minussigns}>-</Text>
          <Spacer direction="horizontal" size="smaller" />
          <VerticalContainer>
            <Text style={styles.summaryexpenseText}>
              {totalExpenses.toFixed(2)}$
            </Text>
            <Text style={styles.summaryText}>Expenses</Text>
          </VerticalContainer>
        </HorizontalContainer>
      </View>
      <Text style={styles.title2}>Expenses with category: </Text>

      <View style={styles.Piecontainer}>
        <Svg viewBox="0 0 200 200" width={250} height={250}>
          <VictoryPie
            width={250}
            height={250}
            data={Expenses}
            innerRadius={40}
            style={{labels: {fontSize: 14, fill: 'none'}}}
            colorScale={Expenses.map(expense => expense.color)}
          />
          <Circle
            cx="130"
            cy="130"
            r="90"
            fill="none"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth={10}
          />
        </Svg>
        {Expenses.length !== 0 && (
          <VictoryLegend
            x={0}
            y={50}
            title="Category"
            centerTitle
            orientation="vertical"
            gutter={20}
            style={{
              labels: {fill: 'navy'},
              title: {fontSize: 20},
            }}
            data={Expenses.map(expense => ({
              name: expense.x,
              symbol: {fill: expense.color},
            }))}
          />
        )}
      </View>
    </View>
  );
};

export default Summary;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Piecontainer: {
    width: 250,
    height: 'auto',
    marginRight: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#1b58d1',
    marginBottom: 15,
    padding: 20,
  },
  title2: {
    fontSize: 20,
    color: '#d90f0f',
    marginBottom: 20,
    fontWeight: '500',
    padding: 15,
  },
  summaryContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'grey',
    width: '90%',
    alignSelf: 'center',
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#000',
  },
  summaryincomeText: {
    fontSize: 18,
    color: '#22ab62',
    fontWeight: 'bold',
  },
  plussigns: {
    fontSize: 28,
    marginVertical: 5,
    color: '#22ab62',
    fontWeight: 'bold',
  },
  minussigns: {
    fontSize: 35,
    color: '#c72a2a',
    fontWeight: 'bold',
  },
  summaryexpenseText: {
    fontSize: 18,
    color: '#c72a2a',
    fontWeight: 'bold',
  },
  transactionItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: '#D1D1D6',
    borderWidth: 1,
  },
  dropdownButtonStyle: {
    width: 150,
    height: 50,
    backgroundColor: '#1b58d1',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
