import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface headerProps {
  name: string;
  type: number;
  setModal?: () => void; 
}

export default function Header({name, type, setModal}: headerProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {type === 1 ? (
        <FontAwesome 
          name="arrow-left" 
          size={30} color="#3CB371" 
          onPress={navigation.goBack}
        />
      ) : (
        <View style={styles.hidden} />
      )}
      
      <Text style={styles.title}>
        {name}
      </Text>

      {type === 0 && <View style={styles.hidden} />}
      {type === 1 && ( 
        <FontAwesome 
          name="bars" 
          size={30} color="#3CB371" 
          onPress={setModal}
        />
      )}
      {type === 2 && (
        <FontAwesome 
          name="times" 
          size={30} color="#3CB371" 
          onPress={() => navigation.navigate("index")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    color: '#3CB371',
    fontWeight: 'bold',
  },
  hidden: {
    width: 30,
  }
})