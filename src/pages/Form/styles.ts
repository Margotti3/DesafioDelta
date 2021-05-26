import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    fontSize: 13,
    color: '#2E8B57',
  },
  input: {
    marginHorizontal: 8,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  error: {
    color: '#ff4444',
    marginLeft: 8,
  },
  errorNumber: {
    color: '#ff4444',
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  textInput: {
    marginHorizontal: 10,
    height: 40,
    minWidth: 80
  },
  textInputNumber: {
    marginHorizontal: 10,
    height: 40,
    maxWidth: 80
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
    width: Dimensions.get('window').width - 112,
    marginHorizontal: 8,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  number: {
    width: 80,
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
});