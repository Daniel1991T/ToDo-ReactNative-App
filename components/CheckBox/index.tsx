import React from 'react';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CheckBoxProps {
  isChecked: boolean,
  onPress: () => void,
}

const CheckBox = (props: CheckBoxProps) => {
  const {onPress, isChecked} = props;
  const name = isChecked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
  return (
    <Pressable onPress={onPress} >
      <MaterialCommunityIcons name={name} size={24} color='white' />
    </Pressable>
  )
}

export default CheckBox;

