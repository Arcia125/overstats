import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

import { SearchInput } from './SearchInput';
import Colors from '../constants/Colors';

export class Search extends Component {
  state = {
    query: '',
  }

  handleSearchChange = query => {
    this.setState({ query })
  }


  handleSearch = () => {
    const { onSearch } = this.props;
    const { query } = this.state;
    onSearch(query)
  }

  render() {
    return (
      <View style={styles.searchContainer}>
        <SearchInput placeholder="Enter a username" value={this.state.query} onChange={this.handleSearchChange}></SearchInput>
        <Button style={styles.searchButton} color={Colors.secondary} title="Search" onPress={this.handleSearch}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchContainer: { flex: 1, flexDirection: 'row', marginBottom: 15 },
  searchButton: {
    marginTop: 50
  },
});
