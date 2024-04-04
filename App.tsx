import 'react-native-gesture-handler';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';

import HomeScreen from './src/screen/HomeScreen';
import ToDoDetail from './src/screen/ToDoDetail';
import { RootStackParamList } from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#007bff" /> */}
      <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'ToDo App',
            headerStyle: {backgroundColor: '#007bff'},
            headerRight: () => (
              <Icon name='search' type='evilicon' />
            )
          }}
        />
        <Stack.Screen
          name="ToDoDetail"
          component={ToDoDetail}
          options={({ route }) => ({headerStyle:{backgroundColor:'#007bff'}, title: route.params.title })}
        />
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
