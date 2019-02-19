import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import { ProfileImage } from '../components/ProfileImage';
import { ProfileLevelDisplay } from '../components/ProfileLevelDisplay';
import { ProfileRankDisplay } from '../components/ProfileRankDisplay';
import SharedStyles from '../constants/SharedStyles';
import { getProfile } from '../utilities/getProfile';

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const playerName = navigation.getParam('playerName');
    return {
      title: playerName ? `${playerName}'s profile` : 'Profile',
    }
  }

  state = {
    profile: null,
    loading: true,
    error: null,
  }

  async componentDidMount() {
    this.setState({ loading: true })
    try {
      const platform = 'pc';
      const region = 'us';
      const { playerName, playerId } = this.props.navigation.state.params;
      const profile = await getProfile({ platform, region, playerName, playerId });
      this.setState({ profile })
    } catch (error) {
      this.setState({ error })
    }
    this.setState({ loading: false })
  }

  renderError = error => {
    return (
      <Text style={SharedStyles.whiteText}>{error && error.message}</Text>
    )
  }

  renderResult({
    username,
    level,
    levelFrame,
    portrait,
    playerId,
    competitive: {
      rank,
      rank_img: rankImg
    }
  }) {
    return (
        <View style={styles.profileScreenContainer}>
          <View style={styles.profileImageContainer}>
            <ProfileImage portrait={portrait} style={styles.profileImage}/>
          </View>
          <View style={styles.profileInfoContainer}>
            <Text style={SharedStyles.centeredWhiteText}>{username}#{playerId}</Text>
            <ProfileLevelDisplay level={level} levelFrame={levelFrame} />
            <ProfileRankDisplay rank={rank} rankImg={rankImg} />
          </View>
        </View>
    )
  }

  render() {
    const { profile, error, loading } = this.state;
    return (
      <ScrollView style={styles.container}>
        {error && this.renderError(error)}
        {profile && this.renderResult(profile)}
        {loading && (<Text style={SharedStyles.centeredWhiteText}>loading...</Text>)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    padding: 25
  },
  profileInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  profileImageContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  profileImage: {
    borderRadius: 5
  },
  profileScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  }
});
