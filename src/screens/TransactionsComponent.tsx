/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import styled from 'styled-components/native';
import {
  HorizontalContainer,
  VerticalContainer,
} from '../components/StyledComponents';
import {StyleSheet, Text} from 'react-native';

const StyledContaier = styled.View`
  flex: 1;
  height: 100%;
`;
interface TransProps {
  data?: any;
}

export const TransactionsComponent: FC<TransProps> = (props: TransProps) => {
  const {data} = props;
  return (
    <StyledContaier>
      <HorizontalContainer style={styles.card}>
        <HorizontalContainer style={styles.content}>
          <VerticalContainer style={styles.textContainer}>
            <Text style={styles.title}>
              Type:{' '}
              <Text
                style={data.type === 'Income' ? styles.value : styles.value2}>
                {data.type}
              </Text>
            </Text>

            <Text style={styles.title}>
              Amount:{' '}
              <Text
                style={data.type === 'Income' ? styles.value : styles.value2}>
                {data.type === 'Income' ? '+' : '-'}
                {data.amount}$
              </Text>
            </Text>

            <Text style={styles.title}>
              Category:{' '}
              <Text
                style={data.type === 'Income' ? styles.value : styles.value2}>
                {data.category}
              </Text>
            </Text>

            <Text style={styles.title}>
              Date:{' '}
              <Text
                style={data.type === 'Income' ? styles.value : styles.value2}>
                {data.date}
              </Text>
            </Text>

            <Text style={styles.title}>
              Description:{' '}
              <Text
                style={data.type === 'Income' ? styles.value : styles.value2}>
                {data.description}
              </Text>
            </Text>
          </VerticalContainer>
        </HorizontalContainer>
      </HorizontalContainer>
    </StyledContaier>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderColor: '#D1D1D6',
    borderWidth: 1,
    shadowColor: '#1b58d1',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '92%',
    padding: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  textContainer: {
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#04021D',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#27A550',
    marginBottom: 10,
  },
  value2: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
});
export default TransactionsComponent;
