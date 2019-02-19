import { StyleSheet } from 'react-native';

import Colors from './Colors';

const SharedStyles = StyleSheet.create({
  whiteText: {
    color: Colors.noticeText,
    fontSize: 30
  },
  textCenter: {
    textAlign: 'center'
  }
})

SharedStyles.centeredWhiteText = StyleSheet.flatten([SharedStyles.whiteText, SharedStyles.textCenter]);

export default SharedStyles;
