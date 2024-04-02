import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Header } from '@rneui/themed';
import { Icon } from 'react-native-elements'

export default function HeaderComponent() {

  const onSearch = () => {
    console.log("onSearch Press");
  }

  const onPressOptions = () => {
    console.log("onPressOptions press")
  }

  return (
    <Header
      statusBarProps={{backgroundColor: '#3600ae'}}
      backgroundColor='#5E00EA'
      barStyle='light-content'
      containerStyle={{ width: '100%' }}
      leftComponent={<View>
      <Text style={styles.heading}>ToDo List</Text>
      </View>}
      leftContainerStyle={{width: '70%'}}
      rightContainerStyle={{width: '30%', }}
      centerContainerStyle={{ display: 'none' }}
      placement='left'
      rightComponent={
        <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-between', backgroundColor: '#000' }}>
          <TouchableOpacity onPress={onSearch} style={styles.headerBtn}>
            <Icon name='search' type='feather' color='#fff'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressOptions} style={styles.headerBtn}>
            <Icon name='more-vertical' type='feather' color='#fff' />
          </TouchableOpacity>
        </View> 
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5E00EA',
    height: '5%',
    flexDirection: 'row',
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerBtn: {
  }
});