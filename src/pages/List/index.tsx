import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import api from '../../services/api';
import LoadingData from '../../components/LoadingData';
import { styles } from './styles';

interface Student {
  id: number;
  name: string;
  profileImg: string;
}

export default function List() {
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

  const loadStudents = useCallback(async () => {
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
  }, [search])

  navigation.addListener('focus', loadStudents);

  useEffect(() => {
    loadStudents();
  }, [loadStudents])

  return (
    <>
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
        <View style={styles.studentsArea}>
          {loadingStudents ? (
            <LoadingData />
          ) : students.map((student: Student, index) => (
            <RectButton key={student.id} onPress={() => handleNavigateToStudent(student.id)}>
              <View style={styles.student}>
                <Image source={{uri: student.profileImg}} style={styles.profileImg} />
                <Text style={styles.studentName}>{student.name}</Text>
              </View>
            </RectButton>
          ))}
        </View>
      </ScrollView>
    </>
  );
}