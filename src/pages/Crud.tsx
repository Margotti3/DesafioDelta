import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,ActivityIndicator } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import api from '../services/api';

interface Student {
  id: number;
  name: string;
  profileImg: string;
}

export default function Crud() {
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [search, setSearch] = useState('');

  function handleNavigateToStudent(id: number) {
    navigation.navigate('student', { id });
  }

  function handleNavigateToForm() {
    navigation.navigate('form');
  }

  useEffect(() => {
    async function loadStudents() {
      setLoadingStudents(true);
      try {
        const response = await api.get('/students', {
          params: {
            search,
          }
        });

        setStudents(response.data);

        setLoadingStudents(false);
      } catch (err) {
        console.log(err);
        setLoadingStudents(false);
      }
    }
    loadStudents();
  }, [search])

  return (<>
    <ScrollView>
      <View style={styles.search}>
        <View style={styles.input}>
          <TextInput
            style={styles.inputSearch}
            value={search}
            onChangeText={setSearch}
            placeholder=" Buscar aluno..."
          />
        </View>
      </View>
      <Text style={styles.result}>{students.length} aluno(s)</Text>
      <RectButton onPress={handleNavigateToForm}>
        <View style={styles.newStudent}>
          <View style={styles.profileImg}>
            <FontAwesome name="user-plus" size={45} color="#3CB371" />
          </View>
          <Text style={styles.newStudentText}>Adicionar Aluno</Text>
        </View>
      </RectButton>
      {!loadingStudents && students.map((student: Student, index) => (
        <RectButton key={student.id} onPress={() => handleNavigateToStudent(student.id)}>
          <View style={styles.student}>
            <Image source={{uri: student.profileImg}} style={styles.profileImg} />
            <Text style={styles.studentName}>{student.name}</Text>
          </View>
        </RectButton>
      ))}
    </ScrollView>
      {loadingStudents && (
        <View style={styles.loading }>
          <ActivityIndicator size="large" color="#3CB371" />
        </View>
      )}</>
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
  },
  loading: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});