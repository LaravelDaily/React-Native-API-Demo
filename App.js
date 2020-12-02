import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, FlatList, Image} from 'react-native'

const API_URL = 'https://api.chucknorris.io/jokes/search?query=cats'
const COLOR = '#0015b0'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      jokesList: []
    }
  }

  componentDidMount () {
    this.apiCall()
  }

  async apiCall () {
    let resp = await fetch(API_URL)
    let json = await resp.json()
    this.setState({jokesList: json.result})
  }


  render () {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>React Native example app</Text>
        </View>

        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          data={this.state.jokesList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.item}>
              <View style={{width: '15%'}}>
                <Image
                  style={styles.tinyIcon}
                  source={{uri: item.icon_url}}
                />
              </View>
              <View style={{width: '85%'}}>
                <Text style={{fontWeight: 'bold'}}>{item.created_at}</Text>
                <Text>{item.value}</Text>
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}

export default App

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: COLOR
  },
  header: {
    backgroundColor: COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50
  },
  headerText: {
    color: '#FFF'
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE'
  },
  item: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tinyIcon: {
    width: 50,
    height: 50,
  }
})
