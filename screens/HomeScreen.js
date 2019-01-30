import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            {this.maybeDisplayDevMode()}
          </View>
        </ScrollView>

      </View>
    );
  }

  maybeDisplayDevMode() {
    if (__DEV__) {
      return (
        <Text>DEV MODE</Text>
      )
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  }
});
