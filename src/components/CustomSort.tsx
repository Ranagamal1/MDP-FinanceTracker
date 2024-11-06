/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import SelectDropdown from 'react-native-select-dropdown';

interface MainProps {
  SelectedType: (type: string) => void;
  type?: string;
}
const StyledContaier = styled.View`
  width: 40%;
`;
const CustomSort: FC<MainProps> = (props: MainProps) => {
  const {SelectedType, type} = props;
  const dropdownItems =
    type === 'filter' ? ['All', 'Income', 'Expense'] : ['Newest', 'Oldest'];

  return (
    <StyledContaier>
      <SelectDropdown
        data={dropdownItems}
        onSelect={selectedItem => {
          SelectedType(selectedItem);
        }}
        renderButton={() => {
          return (
            <View style={styles.dropdownButtonStyle}>
              {type === 'filter' ? (
                <>
                  <Text style={styles.dropdownButtonTxtStyle}>{'Filter'}</Text>
                  <Icon name="filter" color="#000" size={18} />
                </>
              ) : (
                <>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {'Sort by date'}
                  </Text>
                  <Icon name="sort" color="#000" size={18} />
                </>
              )}
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
    </StyledContaier>
  );
};

export default CustomSort;

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
    paddingBottom: '55%',
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
  dropdownButtonStyle: {
    width: 150,
    height: 50,
    backgroundColor: '#fff',
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
