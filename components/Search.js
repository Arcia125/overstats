import React, { Component } from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

export class Search extends Component {
  render() {
    return (
      <TextInput
        style={styles.input}
        placeholder={this.props.placeholder}
        onChangeText={this.props.onChange}
        value={this.props.value}
      ></TextInput>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 14,
    paddingRight: 14,
    width: Dimensions.get('window').width * .55,
    backgroundColor: '#777779',
    color: '#fff',
  }
});
