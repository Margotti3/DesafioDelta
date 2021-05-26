import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';

import cep from 'cep-promise';
import { RouteProp, useNavigation } from '@react-navigation/core';
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { ValidationError } from "yup";

import Loading from '../../components/Loading';
import LoadingData from '../../components/LoadingData';

import { styles } from './styles'
import Header from '../../components/Header';

interface Props {
  route: RouteProp<{params: {id: number}}, 'params'>
}

interface ValidationErrors {
  [key: string]: string[];
}

export default function Form({ route }: Props) {
  const id = route.params ? route.params.id : null;
  const navigation = useNavigation();

  const [image, setImage] = useState<string>('');
  const [name, setName] = useState('');
  const [CEP, setCEP] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);
  const [errors, setErrors] = useState<any>();

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await api.get(`/students/${id}`);
        const { data } = response;

        setName(data.name);
        setImage(data.profileImg);
        setCEP(String(data.zipcode));
        setUf(data.state);
        setCity(data.city);
        setNeighborhood(data.neighborhood);
        setStreet(data.street);
        setNumber(String(data.number));
        setComplement(data.complement);

        setLoadingForm(false);
      } catch (err) {
        alert('Houve um erro de servidor, tente novamente.');
        navigation.navigate('index');
      }
    }

    if (id) {
      loadStudent();
    } else {
      setLoadingForm(false);
    }
  }, [id]);

  useEffect(() => {
    async function loadAddress() {
      try{
        setLoading(true);
        const response = await cep(CEP);
      
        setUf(response.state);
        setCity(response.city);
        setNeighborhood(response.neighborhood);
        setStreet(response.street);

      } catch (err) {
        alert('Sem resultados para o CEP digitado.');
        setCEP('');
      } finally {
        setLoading(false);
      }
    }
    
    if (CEP.length === 8) {
      loadAddress();
    }
  }, [CEP]);

  const handleAddProgileImg = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Precisamos acessar suas fotos');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [3, 3],
      mediaType: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;

    setImage(uri);
  }, []);

  const handleSubmitForm = useCallback(async () => {
    setLoading(true);

    if (!image) {
      alert('Escolha uma imagem!');
      setLoading(false);
    } else {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          zipcode: Yup.string().required('O CEP é obrigatório')
            .test('len', 'O CEP deve conter 8 números', val => val?.length === 8),
          city: Yup.string().required('A cidade é obrigatório'),
          state: Yup.string().required('O estado é obrigatório'),
          street: Yup.string().required('A rua é obrigatório'),
          neighborhood: Yup.string().required('O bairro é obrigatório'),
          number: Yup.number().typeError('O número é obrigatório')
            .required('O número é obrigatório'),
          complement: Yup.string(),
        });

        await schema.validate({
          name,
          zipcode: CEP,
          city,
          state: uf,
          street,
          neighborhood,
          number,
          complement,
        }, {
          abortEarly: false,
        });

        const data = new FormData();

        data.append('name', name);
        data.append('zipcode', CEP);
        data.append('city', city);
        data.append('state', uf);
        data.append('street', street);
        data.append('neighborhood', neighborhood);
        data.append('number', number);
        data.append('complement', complement);
        data.append('file', {
          name: 'image.jpg',
          type: 'image/*',
          uri: image
        } as any);

        if (id) {
          await api.put(`/students/${id}`, data);
        }
        else {
          await api.post('/students', data);
        }

        navigation.navigate('index');
      } catch (err) {
        if (err instanceof ValidationError) {
          let errors: ValidationErrors = {};
      
          err.inner.forEach(error => {
            errors[error.path || ''] = error.errors;
          });
          setErrors(errors);
          alert('Prencha todos os campor corretamente.');
        }
        else {
          alert('Houve um erro de servidor, tente novamente.');
        }
      }
      setLoading(false);
    }
  }, [
    name,
    CEP,
    city,
    uf,
    street,
    neighborhood,
    number,
    complement,
    image,
    id
  ]);

  return (
    <>
      {loadingForm ? (
        <LoadingData />
      ) : (
        <ScrollView>
          <Header name={id ? 'Editar' : 'Novo'}  type={2} />
          {image ? (
            <RectButton onPress={handleAddProgileImg}>
              <Image source={{uri: image}} style={styles.profileImg} />
            </RectButton>
          ) : (
            <RectButton onPress={handleAddProgileImg}>
              <View style={styles.profileImg} />
            </RectButton>
          )}
          
          <Text style={styles.label}>Nome</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              autoFocus={true}
              placeholder="Ex.: João Cleber"
              value={name}
              onChangeText={setName}
            />
          </View>
          {errors && errors.name && (
            <Text style={styles.error}>{errors.name[0]}</Text>
          )}
          
          <Text style={styles.label}>CEP</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Ex.: 99999999"
              maxLength={8}
              value={CEP}
              onChangeText={setCEP}
            />
          </View>
          {errors && errors.zipcode && (
            <Text style={styles.error}>{errors.zipcode[0]}</Text>
          )}
          
          <View style={styles.inputsRow}>
            <View>
              <Text style={styles.label}>UF</Text>
              <View style={styles.uf}>
                <TextInput
                  style={styles.textInput}
                  value={uf}
                  editable={false}
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Cidade</Text>
              <View style={styles.city}>
                <TextInput
                  style={styles.textInput}
                  value={city}
                  editable={false}
                />
              </View>
            </View>
          </View>
          
          <Text style={styles.label}>Bairro</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              value={neighborhood}
              editable={false}
            />
          </View>
          
          <View style={styles.inputsRow}>
            <View>
              <Text style={styles.label}>Rua</Text>
              <View style={styles.street}>
                <TextInput
                  style={styles.textInput}
                  value={street}
                  editable={false}
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Número</Text>
              <View style={styles.number}>
                <TextInput
                  style={styles.textInputNumber}
                  value={number}
                  maxLength={6}
                  onChangeText={setNumber}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
            {errors && errors.number && (
              <Text style={styles.errorNumber}>{errors.number[0]}</Text>
            )}
          
          <Text style={styles.label}>Complemento</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              placeholder="Ex.: Apartamento 205"
              value={complement}
              onChangeText={setComplement}
            />
          </View>

          <RectButton style={styles.submit} onPress={handleSubmitForm}>
            <Text style={styles.textSubmit}>salvar</Text>
          </RectButton>
          
          <View style={styles.footer} />
        </ScrollView>
      )}
      
      {loading && (
        <Loading />
      )}
      
    </>
  );
}