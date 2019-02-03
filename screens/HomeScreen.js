import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
} from 'react-native';

import { Search } from '../components/Search';
import Colors from '../constants/Colors';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  state = {
    query: '',
  }

  handleSearchChange = query => {
    this.setState({ query })
  }


  handleSearch = async () => {
    const { navigate } = this.props.navigation;
    const { query } = this.state;
    const [playerName, playerId] = query.split('#');
    navigate('Profile', { playerName, playerId });
  }



  renderSearch() {
    return (
      <View style={styles.searchContainer}>
        <Search placeholder="Enter a username" value={this.state.query} onChange={this.handleSearchChange}></Search>
        <Button style={styles.searchButton} color={Colors.secondary} title="Search" onPress={this.handleSearch}></Button>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            {this.maybeDisplayDevMode()}
            <Text style={styles.title}>Overstats</Text>
            {this.renderSearch()}
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
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  searchContainer: { flex: 1, flexDirection: 'row', marginBottom: 15 },
  devModeText: {
    color: '#009ae4'
  },
  title: {
    paddingTop: 50,
    fontSize: 75,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
    fontFamily: Platform.select({
      ios: 'Helvetica Neue',
      android: 'Roboto'
    }),
  },
  searchButton: {
    marginTop: 50
  },
  whiteText: {
    color: '#fff'
  }
});
