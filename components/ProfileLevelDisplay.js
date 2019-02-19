import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet
} from 'react-native';

import SharedStyles from '../constants/SharedStyles';

const ProfileLevelDisplay = ({ levelFrame, level }) => {
  const levelFrameProvided = levelFrame !== "";
  const levelNumber = <View style={levelFrameProvided ? styles.levelTextContainer : styles.levelTextContainerNoLevelFrame}>
    <Text style={SharedStyles.centeredWhiteText}>{level}</Text>
  </View>;
  if (!levelFrameProvided) {
    return levelNumber
  }
  return (
    <ImageBackground source={{ uri: levelFrame }} style={styles.levelFrame}>
      {levelNumber}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  levelFrame: {
    height: 175,
    width: 175,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  levelTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  levelTextContainerNoLevelFrame: {
    marginTop: 75,
    marginBottom: 75,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export { ProfileLevelDisplay };
