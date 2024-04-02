import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { MEDIUM_PRIORITY, PRIORITY_LIST } from '../utils/constants';

const validationSchema = yup.object().shape({
  todoTitle: yup.string().required('Titile is required'),
  priority: yup.string().required('Priority is required'),
  description: yup.string().required('Description is required'),
});

export default function ToDoDetail({route, navigation}) {
  const { data } = route?.params;
  const [selectedPriority, setSelectedPriority] = useState(data?.priority || MEDIUM_PRIORITY);

  useEffect(() => {
    console.log("selectedPriority =>", selectedPriority)
  }, [selectedPriority]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('ToDoList');
      console.log("jsonValue in getData", jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const addToDo = async (values: object) => {
    // await AsyncStorage.clear()
    const todoList = await getData();
    console.log("existing todoList ===> ", todoList, "values", values)
    let jsonValue;
    if(!todoList || todoList.length === 0){
      jsonValue = JSON.stringify([values]);
    }else {
      jsonValue = JSON.stringify([...todoList,values]);
    }
    console.log("begfore add check ######>", jsonValue)
    await AsyncStorage.setItem('ToDoList', jsonValue);
    navigation.push('HomeScreen');
  }

  const handlePriority = (priority: string) => {
    console.log("priority", priority)
    setSelectedPriority(priority);
  }

  return (
    <View style={styles.container}>
        <Formik
     initialValues={{ todoTitle: data?.todoTitle || '', description: data?.description || '', priority: selectedPriority }}
     onSubmit={values => addToDo(values)}
     validationSchema={validationSchema}
   >
     {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
       <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <TextInput
            style={errors.todoTitle && touched.todoTitle ? styles.errorInput : styles.input}
            onChangeText={handleChange('todoTitle')}
            onBlur={handleBlur('todoTitle')}
            value={values.todoTitle}
            placeholder="todo title"
          />
          {errors.todoTitle && touched.todoTitle ? (<View><Text style={styles.errorMsg}>{errors.todoTitle}</Text></View>) : null}
        </View>
        <View style={styles.fieldContainer}>
          <Picker
            selectedValue={selectedPriority}
            onValueChange={(itemValue) => handlePriority(itemValue)}
            style={styles.priorityContainer}
          >
            {PRIORITY_LIST.map((priority, index) => <Picker.Item label={priority} value={priority} key={index} />)}
          </Picker>
        </View>
        <View style={styles.fieldContainer}>
          <TextInput
            multiline
            numberOfLines={4}
            style={errors.description && touched.description ? styles.errorInput : styles.input}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            placeholder="description"
          />
          {errors.description && touched.description ? (<View><Text style={styles.errorMsg}>{errors.description}</Text></View>) : null}
        </View>
        <TouchableOpacity style={styles.btnStyles} onPress={handleSubmit}>
          <Text style={styles.btnTextStyles}>{route?.params?.btnName} </Text>
        </TouchableOpacity>
       </View>
     )}
   </Formik>
    </View>
  );
}

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