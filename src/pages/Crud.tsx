import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default function Crud() {
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("Lista");
  }

  return (
    <View>
      <TouchableOpacity onPress={handleNavigate}>
        <Text>
          vai
        </Text>
      </TouchableOpacity>
      <Text>
        Bão
      </Text>
      
    </View>
  );
}