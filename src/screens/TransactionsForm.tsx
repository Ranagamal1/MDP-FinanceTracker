/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomDropdown from '../components/CustomDropdown';
import {HorizontalContainer} from '../components/StyledComponents';
import {Spacer} from '../components/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SelectDropdown from 'react-native-select-dropdown';
import {categories} from '../Helpers/constants';

export const TransactionsForm: FC = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('Income');

  const validateInputs = () => {
    if (!amount) {
      Alert.alert('Validation Error', 'Please enter an amount.');
      return false;
    }
    if (!category) {
      Alert.alert('Validation Error', 'Please enter a category.');
      return false;
    }
    if (!description) {
      Alert.alert('Validation Error', 'Please enter a description.');
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }
    const transactionData = {
      type: transactionType,
      amount: parseFloat(amount),
      category,
      date: date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
      description,
    };
    ToastAndroid.showWithGravityAndOffset(
      'Transacrion Added successfully!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    try {
      const jsonValue = await AsyncStorage.getItem('transactions');
      const existingTransactions =
        jsonValue != null ? JSON.parse(jsonValue) : [];

      // Append the new transaction
      const updatedTransactions = [...existingTransactions, transactionData];
      await AsyncStorage.setItem(
        'transactions',
        JSON.stringify(updatedTransactions),
      );
    } catch (e) {
      console.error('Failed to save transaction:', e);
    }
    resetForm();
  };
  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date());
    setTransactionType('income');
  };
  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled style={{height: '100%'}}>
        <Text style={styles.title}>Add New Transaction</Text>

        <HorizontalContainer style={{width: '100%'}}>
          <Text>Type:</Text>
          <CustomDropdown
            SelectedType={type => {
              setTransactionType(type);
            }}
          />
        </HorizontalContainer>
        <Spacer direction="vertical" size="small" />
        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category:</Text>
          <SelectDropdown
            data={categories}
            onSelect={selectedItem => {
              setCategory(selectedItem);
            }}
            renderButton={() => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>{category}</Text>
                  <Icon name="chevron-down" color="#000" size={18} />
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
                  <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Date: <Text style={styles.dateText}>
            {date.toISOString().split('T')[0]}
          </Text></Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>Select Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              maximumDate={new Date()}
              minimumDate={new Date(new Date().getFullYear(), 0, 1)}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(false);
                setDate(currentDate);
              }}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TransactionsForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '93%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#1b58d1',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#3c76e8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  dateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#3c76e8',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 0.5,
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
    color: '#000',
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
