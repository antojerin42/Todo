import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { CREATE_TODO, MEDIUM_PRIORITY, PRIORITY_LIST } from '../../utils/constants';
import styles from './ToDoDetail.style';
import { ToDoDetailProps } from './ToDoDetail.interface';
import { Icon } from 'react-native-elements';

const validationSchema = yup.object().shape({
  todoTitle: yup.string().required('Titile is required'),
  priority: yup.string().required('Priority is required'),
  description: yup.string().required('Description is required'),
});

const ToDoDetail: React.FC<ToDoDetailProps> = (props) => {
  const { route, navigation } = props;
  const { data, id } = route?.params;
  const [selectedPriority, setSelectedPriority] = useState(data?.priority || MEDIUM_PRIORITY);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('ToDoList');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const updateToDo = async (values: object) => {
    const todoList = await getData();
    todoList[id] = {...values, priority: selectedPriority}
    const jsonValue = JSON.stringify([...todoList]);
    console.log("Key _______>", id)
    console.log("begfore edit check ######>", jsonValue)
    await AsyncStorage.setItem('ToDoList', jsonValue);
    navigation.push('HomeScreen');
  }

  const deleteToDo = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this ToDo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            const todoList = await getData();
            todoList.splice(id, 1);
            const jsonValue = JSON.stringify(todoList);
            await AsyncStorage.setItem('ToDoList', jsonValue);
            navigation.push('HomeScreen');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const addToDo = async (values: object) => {
    // await AsyncStorage.clear()
    const todoList = await getData();
    console.log("existing todoList ===> ", todoList, "values", values)
    let jsonValue;
    if(!todoList || todoList.length === 0){
      jsonValue = JSON.stringify([{...values, priority: selectedPriority}]);
    }else {
      jsonValue = JSON.stringify([...todoList,{...values, priority: selectedPriority}]);
    }
    console.log("begfore add check ######>", jsonValue)
    await AsyncStorage.setItem('ToDoList', jsonValue);
    navigation.push('HomeScreen');
  }

  const handlePriority = (priority: string) => {
    setSelectedPriority(priority);
  }

  const onSubmit = (values: object) => {
    if(route.params.btnName === CREATE_TODO) {
      addToDo(values);
    } else {
      updateToDo(values);
    }
  }

  return (

    <View style={styles.container}>
    {route.params.btnName !== CREATE_TODO && (
      <TouchableOpacity style = {styles.trashContainer}>
        <Icon onPress={deleteToDo} reverse name='trash' type='font-awesome' color={'#00D7C2'} />
      </TouchableOpacity>
    )}
        <Formik
     initialValues={{ todoTitle: data?.todoTitle || '', description: data?.description || '', priority: selectedPriority }}
     onSubmit={values => onSubmit(values)}
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

export default ToDoDetail;