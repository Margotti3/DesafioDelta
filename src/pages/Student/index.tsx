import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import api from '../../services/api';
import LoadingData from '../../components/LoadingData';
import { styles } from './styles';

interface Props {
  route: RouteProp<{params: {id: number}}, 'params'>
}

interface Student {
  id: number,
  name: string,
  profileImg: string,
  zipcode: string,
  city: string,
  state: string,
  neighborhood: string,
  street: string,
  number: string,
  complement: string,
}

export default function Student({ route }: Props) {
  const { id } = route.params
  const navigation = useNavigation();

  const [student, setStudent] = useState<Student>();

  const [modalVisible, setModalVisible] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await api.get(`/students/${id}`);

        setStudent(response.data);

        setLoadingData(false);
      } catch (err) {
        console.log(err);
        setLoadingData(false);
      }
    }

    loadStudent();
  }, []);

  function handleEdit() {
    navigation.navigate('form', { id });
  }

  async function handleDelete() {
    try{
      await api.delete(`/students/${id}`);

      navigation.navigate('index', { id });
    } catch (err) {
      console.log(err);
    }
  }

  function handleDeleteConfirm() {
    
    Alert.alert(
      "Excluir",
      "Deseja excluir o aluno?",
      [
        {
          text: "Não",
          onPress: () => setModalVisible(visible => !visible),
          style: "cancel"
        },
        { text: "Sim", onPress: handleDelete }
      ]
    );
  }

  return (
    <>
      {loadingData || !student ? (
        <LoadingData />
      ) : (
        <ScrollView>
          <Header name="cleiton" type={1} setModal={() => setModalVisible(visible => !visible)} />
          {student.profileImg ? (
            <Image source={{uri: student.profileImg}} style={styles.profileImg} />
          ) : (
            <View style={styles.profileImg} />
          )}
          
          <Text style={styles.label}>Nome</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              value={student.name}
              editable={false}
            />
          </View>
          
          <Text style={styles.label}>CEP</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              value={String(student.zipcode)}
              editable={false}
            />
          </View>
          
          <View style={styles.inputsRow}>
            <View>
              <Text style={styles.label}>UF</Text>
              <View style={styles.uf}>
                <TextInput
                  style={styles.textInput}
                  value={student.state}
                  editable={false}
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Cidade</Text>
              <View style={styles.city}>
                <TextInput
                  style={styles.textInput}
                  value={student.city}
                  editable={false}
                />
              </View>
            </View>
          </View>
          
          <Text style={styles.label}>Bairro</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              value={student.neighborhood}
              editable={false}
            />
          </View>
          
          <View style={styles.inputsRow}>
            <View>
              <Text style={styles.label}>Rua</Text>
              <View style={styles.street}>
                <TextInput
                  style={styles.textInput}
                  value={student.street}
                  editable={false}
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Número</Text>
              <View style={styles.number}>
                <TextInput
                  style={styles.textInput}
                  value={String(student.number)}
                  editable={false}
                />
              </View>
            </View>
          </View>
          
          <Text style={styles.label}>Complemento</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              value={student.complement || ''}
              editable={false}
            />
          </View>
          
          <View style={styles.footer} />

          {modalVisible && (
            <View style={styles.modalState}>
              <View style={styles.close}>
                <FontAwesome 
                  name="bars" 
                  size={30} color="#3CB371" 
                  onPress={() => setModalVisible(visible => !visible)}
                />
              </View>
              
              <View style={styles.modal}>
                <RectButton style={styles.buttonOption} onPress={handleEdit}>
                  <Text style={styles.textOption}>Editar</Text>
                  <FontAwesome name="edit" size={30} color="#ffc721" /> 
                </RectButton>
                <RectButton style={styles.buttonOption} onPress={handleDeleteConfirm  }>
                  <Text style={styles.textOption}>Excluir</Text>
                  <FontAwesome name="times" size={30} color="#ff3535" /> 
                </RectButton>
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
}