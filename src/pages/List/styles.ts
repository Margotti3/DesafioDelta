import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  studentsArea: {
    minHeight: Dimensions.get('window').height - 300,
  }
});