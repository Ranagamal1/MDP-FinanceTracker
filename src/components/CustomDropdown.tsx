/* eslint-disable react/react-in-jsx-scope */
import {FC, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import {dropdownItems} from '../Helpers/constants';

interface MainProps {
  SelectedType: (type: string) => void;
}
interface ColorProps {
  backgroundColor: string;
}
const StyledContaier = styled.View`
  padding-left: 18px;
`;
const StyleddropdownHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  border-radius: 4px;
`;
const StyleddropdownHeaderText = styled.Text`
  font-size: 16px;
  color: #000;
`;
const StyleddropdownContent = styled.View<ColorProps>`
  margin-top: 8px;
  border-width: 1px;
  border-radius: 12px;
  background-color: ${props => props.backgroundColor};
`;
const StyleddropdownItem = styled.TouchableOpacity`
  padding-horizontal: 16px;
  padding-vertical: 12px;
`;
const Styleditem = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;
const CustomDropdown: FC<MainProps> = (props: MainProps) => {
  const {SelectedType} = props;
  const [isOpen, setIsOpen] = useState(false);

  const [selectedvalue, setselectedValue] = useState<string>('Income');

  return (
    <StyledContaier>
      <StyleddropdownHeader onPress={() => setIsOpen(!isOpen)}>
        <StyleddropdownHeaderText>{selectedvalue}</StyleddropdownHeaderText>
        <Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={15}
          color="#000"
        />
      </StyleddropdownHeader>
      {isOpen && (
        <StyleddropdownContent backgroundColor="#3c76e8">
          {dropdownItems.map((item, index) => (
            <StyleddropdownItem
              key={index}
              onPress={() => {
                setselectedValue(item);
                SelectedType(item);
                setIsOpen(false);
              }}>
              <Styleditem>{item}</Styleditem>
            </StyleddropdownItem>
          ))}
        </StyleddropdownContent>
      )}
    </StyledContaier>
  );
};

export default CustomDropdown;
