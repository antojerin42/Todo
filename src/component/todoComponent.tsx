import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { HIGH_PRIORITY, MEDIUM_PRIORITY } from '../utils/constants';

export default function ToDoItem({onPress, data}) {
  const getPriorityColor = (priority: string) => {
    let color;
    switch(priority) {
      case HIGH_PRIORITY: {
        color='red'
      }
      break;
      case MEDIUM_PRIORITY: {
        color='yellow'
      }
      break;
      default: {
        color='green'
      }
      break;
    }
    return color;
  }

  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.container}>
      <View style={styles.headerContainer}>
      <Text style={styles.titleStyle}>{data.todoTitle}</Text>
      <Entypo name="controller-record" size={18} color={getPriorityColor(data.priority)} style={styles.icon} />
      </View>
      <Text>{data.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: '45%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 10,
    margin: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    minHeight: 30,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '500',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
});