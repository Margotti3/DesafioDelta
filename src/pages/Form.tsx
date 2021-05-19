import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView, TextInput } from 'react-native-gesture-handler';

import cep from 'cep-promise';
import ContentLoader from 'react-content-loader';
import { Circle, Rect } from 'react-native-svg';
interface viaCepResponse {
  bairro: string;
}

export default function Form() {
  const id = null;
  const [name, setName] = useState('');
  const [CEP, setCEP] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeigborhood] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);

  useEffect(() => {
    if (id) {
      console.log('opa');
    }

    setLoadingForm(false);
  }, []);

  useEffect(() => {
    async function loadAddress() {
      try{
        setLoading(true);
        const response = await cep(CEP);
      
        setUf(response.state);
        setCity(response.city);
        setNeigborhood(response.neighborhood);
        setStreet(response.street);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    
    if (CEP.length === 8) {
      loadAddress();
    }
  }, [CEP]);

  function handleSubmitForm() {

  }

  return (
    <>
      {loadingForm ? (
        <ContentLoader 
          speed={2}
          width={400}
          height={800}
          backgroundColor={'#fff'}
          foregroundColor={'#2E8B57'}
        >
          <Circle r="60" cy="80" cx={Dimensions.get('window').width/2} />
          <Rect x="10" y="180" rx="15" ry="15" width={Dimensions.get('window').width - 20} height="40" />
          <Rect x="10" y="250" rx="15" ry="15" width={Dimensions.get('window').width - 20} height="40" />
          <Rect x="10" y="320" rx="15" ry="15" width={Dimensions.get('window').width - 20} height="40" />
          <Rect x="10" y="390" rx="15" ry="15" width={Dimensions.get('window').width - 20} height="40" />
        </ContentLoader>
      ) : (
        <ScrollView>
          <View style={styles.profileImg} />
          <Text style={styles.label}>Nome</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              autoFocus={true}
              placeholder="João Cleber"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <Text style={styles.label}>CEP</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="99999999"
              maxLength={8}
              value={CEP}
              onChangeText={setCEP}
            />
          </View>
          
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
                  style={styles.textInput}
                  value={number}
                  onChangeText={setNumber}
                />
              </View>
            </View>
          </View>
          
          <Text style={styles.label}>Complemento</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              placeholder="Apartamento 205"
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
        <View style={styles.loading }>
          <ActivityIndicator size="large" color="#3CB371" />
        </View>
      )}
      
    </>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    height: 150,
    width: 150,
    margin: 20,
    alignSelf: 'center',
    borderRadius: 500,
    backgroundColor: '#eee'
  },
  label: {
    marginBottom: 8,
    marginTop: 15,
    marginHorizontal: 15,
    fontFamily: 'arial',
    fontSize: 13,
    color: '#2E8B57',
  },
  input: {
    marginHorizontal: 8,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  textInput: {
    marginHorizontal: 10,
    height: 40,
    minWidth: 80
  },
  inputsRow: {
    flexDirection: 'row',
  },
  uf: {
    width: 45,
    marginHorizontal: 8,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  city: {
    width: Dimensions.get('window').width - 77,
    marginHorizontal: 8,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  street: {
    width: Dimensions.get('window').width - 92,
    marginHorizontal: 8,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  number: {
    width: 60,
    marginHorizontal: 8,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  submit: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 40,
    backgroundColor: '#2E8B57',
    borderRadius: 8,
    marginTop: 20,
  },
  textSubmit: {
    color: '#fff',
    fontSize: 23,
  },
  footer: {
    height: 20,
  },
  loading: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});