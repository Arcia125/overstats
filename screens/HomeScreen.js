import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';

import Colors from '../constants/Colors';
import { Search } from '../components/Search';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handleSearch = query => {
    const { navigate } = this.props.navigation;
    const [playerName, playerId] = query.split('#');
    navigate('Profile', { playerName, playerId });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>Overstats</Text>
            <Search onSearch={this.handleSearch}></Search>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground
  },
  contentContainer: {
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
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
});
