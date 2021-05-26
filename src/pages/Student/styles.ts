import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalState: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  close: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modal: {
    alignSelf: 'flex-end',
    marginTop: 10,
    width: 150,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0,
  },
  buttonOption: {
    width: 150,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1
  },
  textOption: {
    fontSize: 20,
    color: '#333',
  },
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
  footer: {
    height: 20,
  }
});