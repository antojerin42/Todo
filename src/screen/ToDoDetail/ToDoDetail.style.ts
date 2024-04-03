import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: 15,
      height: '100%',
      justifyContent: 'space-between',
    },
    formContainer: {
      height: '90%',
    },
    fieldContainer: {
      paddingBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#B6B6B6',
      padding: 10,
      marginBottom: 20,
    },
    btnStyles: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5E00EA',
    },
    btnTextStyles: {
      fontSize: 20,
      fontWeight: '600',
      color: '#fff'
    },
    errorMsg: {
      color: 'red',
    },
    errorInput: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'red',
      padding: 10,
      marginBottom: 10,
    },
    priorityContainer: {
      borderColor: 'a3a3a3',
      borderWidth: 1,
    }
  });

  export default styles