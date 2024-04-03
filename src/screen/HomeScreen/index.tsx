import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ToDoItem from '../../component/todoComponent';
import styles from './HomeScreen.style';
import { HomeScreenProps } from './HomeScreen.interface';
import { CREATE_TODO } from '../../utils/constants';

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const { navigation } = props;

  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('ToDoList');
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
    navigation.push('ToDoDetail', {btnName: CREATE_TODO, title: 'Create', data: {}, id:''});
  }


  return (
    <View style={styles.container}>
      {tasks.map((item, index) => {
        return (
          <ToDoItem key={index} navigation={navigation} data={item} id={index}/>
        )
      })}
      <View style={styles.buttonContainer}>
        <Icon onPress={createToDo} reverse name='plus' type='font-awesome' color={'#00D7C2'} />
      </View>
    </View>
  );
}

export default HomeScreen;
