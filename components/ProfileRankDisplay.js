import React from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import SharedStyles from '../constants/SharedStyles';

const ProfileRankDisplay = ({ rank, rankImg }) => (
  <View style={styles.rankRow}>
    <Text style={SharedStyles.centeredWhiteText}>{rank}</Text>
    <Image source={{ uri: rankImg, width: 40, height: 40 }}></Image>
  </View>
);

const styles = StyleSheet.create({
  rankRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  }
})

export { ProfileRankDisplay };
