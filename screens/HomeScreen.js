import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  Image,
} from 'react-native';

import { Search } from '../components/Search';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static apiBaseUrl = 'https://overwatchy.com';

  state = {
    query: '',
    result: null
  }

  handleSearchChange = query => {
    this.setState({ query })
  }


  handleSearch = async () => {
    const { query } = this.state;
    const platform = 'pc';
    const region = 'us';
    const [playerName, playerId] = query.split('#');
    const tag = [playerName, playerId].join('-');
    const url = `${HomeScreen.apiBaseUrl}/profile/${platform}/${region}/${tag}`;
    console.log(`running search ${url}`);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('got response, getting json')
      const result = Object.assign({}, await response.json(), { playerId });
      console.log(result);
      this.setState({ result });
    } catch (error) {
      console.error(error);
    }
  }

  renderResults() {
    if (!this.state.result) {
      return;
    }
    const {
      result: {
        username,
        level,
        portrait,
        playerId,
        competitive: {
          rank,
          rank_img: rankImg
        }
      }
    } = this.state;
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image source={{ uri: portrait, width: 125, height: 125 }}></Image>
        <View>
          <Text style={styles.whiteText}>{username}#{playerId}</Text>
          <Text style={styles.whiteText}>{level}</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={styles.whiteText}>{rank}</Text>
            <Image source={{ uri: rankImg, width: 25, height: 25 }}></Image>
          </View>
        </View>
      </View>
    )
  }

  renderSearch() {
    return (
      <View style={styles.searchContainer}>
        <Search placeholder="Enter a username" value={this.state.query} onChange={this.handleSearchChange}></Search>
        <Button style={styles.searchButton} color="#7D26CD" title="Search" onPress={this.handleSearch}></Button>
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
            {this.renderResults()}
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
    color: '#ff9c00',
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
