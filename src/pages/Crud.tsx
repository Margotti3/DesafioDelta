import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import ContentLoader from 'react-content-loader';
import { Circle, Rect } from 'react-native-svg';

export default function Crud() {
  const navigation = useNavigation();
  const students = ['', '', '', ''];
  const [loadingStudents, setLoadingStudents] = useState(false);

  function handleNavigateToStudent() {
    navigation.navigate("Student");
  }

  function handleNavigateToForm() {
    navigation.navigate("Form");
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
      <RectButton onPress={handleNavigateToForm}>
        <View style={styles.newStudent}>
          <View style={styles.profileImg}>
            <FontAwesome name="user-plus" size={45} color="#3CB371" />
          </View>
          <Text style={styles.newStudentText}>Adicionar Estudante</Text>
        </View>
      </RectButton>
      {loadingStudents ? (
        <ContentLoader 
          speed={2}
          width={400}
          height={400}
          backgroundColor={'#fff'}
          foregroundColor={'#2E8B57'}
        >
          <Rect x="10" y="20" rx="15" ry="15" width={Dimensions.get('window').width - 20} height="80" />
          <Rect x="10" y="120" rx="15" ry="15" width={Dimensions.get('window').width - 20} height="80" />
          <Rect x="10" y="220" rx="15" ry="15" width={Dimensions.get('window').width - 20} height="80" />
          <Rect x="10" y="320" rx="15" ry="15" width={Dimensions.get('window').width - 20} height="80" />
        </ContentLoader>
      ) : students.map((student, index) => (
        <RectButton key={index} onPress={handleNavigateToStudent}>
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
  newStudent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#3CB371',
  },
  newStudentText: {
    marginLeft: 20,
    fontSize: 16,
    color: '#fff',
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
    justifyContent: 'center',
    alignItems: 'center',
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