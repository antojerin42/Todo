import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ToDoItem from '../component/todoComponent';

export default function HomeScreen({navigation}) {
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('ToDoList');
      console.log("jsonValue in getData", jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    const viewToDoList = async () => {
      const toDoList = await getData();
      if(!toDoList) {
        setTasks([]);
      } else {
        setTasks(toDoList);
      }
    }
    viewToDoList();
  }, []);

  const createToDo = () => {
    console.log("create todo");
    navigation.push('ToDoDetail', {btnName: 'ADD', title: 'Add'});
  }

  const editToDo = (data) => {
    console.log("edit todo");
    navigation.push('ToDoDetail', {btnName: 'UPDATE', title: 'Update', data});
  }

  return (
    <View style={styles.container}>
      {tasks.map((item, index) => {
        return (
          <ToDoItem key={index} onPress={() => editToDo(item)} data={item}/>
        )
      })}
      <View style={styles.buttonContainer}>
        <Icon onPress={createToDo} reverse name='plus' type='font-awesome' color={'#00D7C2'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff'
  },
  buttonContainer: {
    position: 'absolute',
    right: '5%',
    top: '90%',

  },
});