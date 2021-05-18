import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function List() {
  return (
    <ScrollView>
      <View style={styles.profileImg} />
      <Text style={styles.label}>Nome</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value="Cleiton Fernandes"
          editable={false}
        />
      </View>
      
      <Text style={styles.label}>CEP</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value="35501-716"
          editable={false}
        />
      </View>
      
      <View style={styles.inputsRow}>
        <View>
          <Text style={styles.label}>UF</Text>
          <View style={styles.uf}>
            <TextInput
              style={styles.textInput}
              value="MG"
              editable={false}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Cidade</Text>
          <View style={styles.city}>
            <TextInput
              style={styles.textInput}
              value="Divinópolis"
              editable={false}
            />
          </View>
        </View>
      </View>
      
      <Text style={styles.label}>Bairro</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value="Antônio Fonseca"
          editable={false}
        />
      </View>
      
      <View style={styles.inputsRow}>
        <View>
          <Text style={styles.label}>Rua</Text>
          <View style={styles.street}>
            <TextInput
              style={styles.textInput}
              value="Dona Lavínea Fonseca"
              editable={false}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Número</Text>
          <View style={styles.number}>
            <TextInput
              style={styles.textInput}
              value="12345"
              editable={false}
            />
          </View>
        </View>
      </View>
      
      <Text style={styles.label}>Complemento</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value="casa verde"
          editable={false}
        />
      </View>
      
      <View style={styles.footer} />
    </ScrollView>
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
  footer: {
    height: 20,
  }
});