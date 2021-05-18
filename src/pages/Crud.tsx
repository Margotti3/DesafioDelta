import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

export default function Crud() {
  const navigation = useNavigation();
  const students = ['', '', '', ''];

  function handleNavigate() {
    navigation.navigate("Lista");
  }

  return (
    <ScrollView>
      <View style={styles.search}>
        <View style={styles.input}>
          <TextInput
            style={styles.inputSearch}
            placeholder=" Buscar aluno..."
          />
        </View>
        <FontAwesome name="search" size={30} color="#3CB371" />
      </View>
      <Text style={styles.result}>32 aluno(s)</Text>
      {students.map((student, index) => (
        <RectButton key={index} onPress={handleNavigate}>
          <View style={styles.student}>
            <View style={styles.profileImg} />
            <Text style={styles.studentName}>Aluno teste {index}</Text>
          </View>
        </RectButton>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 80,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderRadius: 15,
    backgroundColor: '#dcdcdc',
    width: '90%',
  },
  inputSearch: {
    height: 40,
    marginHorizontal: 10,
    border: 0,
  },
  result: {
    flexDirection: 'row',
    textAlign: 'right',
    margin: 10,
    color: '#2E8B57',
    fontWeight: 'bold',
    fontSize: 12,
  },
  student: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderColor: '#3CB371',
  },
  profileImg: {
    backgroundColor: '#dcdcdc',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#3CB371',
    height: 70,
    width: 70,
    marginLeft: 10,
  },
  studentName: {
    marginLeft: 20,
    fontSize: 16,
    color: '#555',
  }
});