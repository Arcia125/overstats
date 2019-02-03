import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Colors from '../constants/Colors';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const playerName = navigation.getParam('playerName');
    return {
      title: playerName ? `${playerName}'s profile` : 'Profile',
    }
  }

  static apiBaseUrl = 'https://overwatchy.com';

  state = {
    result: null,
    error: null
  }

  getJSON = async (url) => {
    const response = await fetch (url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    return result;
  }

  async componentDidMount() {
    try {
      console.log(this.props.navigation)
      const result = await this.performSearch(this.props.navigation.state.params);
      this.setState({ result })
    } catch (error) {
      this.setState({ error })
    }
  }

  async performSearch({ playerName, playerId }) {
    const platform = 'pc';
    const region = 'us';
    const tag = [playerName, playerId].join('-');
    const url = `${ProfileScreen.apiBaseUrl}/profile/${platform}/${region}/${tag}`;
    console.log(`running search ${url}`);
    const json = await this.getJSON(url);
    const result = { ...json, playerId };
    return result;
  }

  renderError = error => {
    return (
      <Text style={styles.whiteText}>{error && error.message}</Text>
    )
  }

  renderResults({
    username,
    level,
    portrait,
    playerId,
    competitive: {
      rank,
      rank_img: rankImg
    }
  }) {
    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image style={{ marginRight: 15 }} source={{ uri: portrait, width: 125, height: 125 }}></Image>
          <View>
            <Text style={styles.whiteText}>{username}#{playerId}</Text>
            <Text style={styles.whiteText}>{level}</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.whiteText}>{rank}</Text>
              <Image source={{ uri: rankImg, width: 25, height: 25 }}></Image>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }

  render() {
    const { result, error } = this.state;
    if (error) {
      return this.renderError(error);
    }
    if (result) {
      return this.renderResults(result);
    }
    return <Text>loading...</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground
  },
  whiteText: {
    color: Colors.noticeText
  }
})
