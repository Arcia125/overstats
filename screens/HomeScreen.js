import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Button
} from 'react-native';

import { Search } from '../components/Search';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    query: ''
  }

  handleSearchChange = query => {
    this.setState({ query })
  }

  handleSearch = () => {
    const { query } = this.state;
    console.log(query);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            {this.maybeDisplayDevMode()}
            <Text style={styles.title}>Overstats</Text>
            <View style={styles.searchContainer}>
              <Search placeholder="Enter a username" value={this.state.query} onChange={this.handleSearchChange}></Search>
              <Button style={styles.searchButton} title="Search" onPress={this.handleSearch}></Button>
            </View>
          </View>
        </ScrollView>

      </View>
    );
  }

  maybeDisplayDevMode() {
    if (__DEV__) {
      return (
        <Text style={styles.devModeText}>DEV MODE</Text>
      )
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262629'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  searchContainer: { flex: 1, flexDirection: 'row' },
  devModeText: {
    color: '#009ae4'
  },
  title: {
    fontSize: 75,
    color: '#ff9c00',
    marginBottom: 10,
    fontFamily: Platform.select({
      ios: 'Helvetica Neue',
      android: 'Roboto'
    }),
  },
  searchButton: {
    marginTop: 50,
  }
});
