import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const MatchScreen = props => {
  const foodData = props.navigation.getParam('foodData');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MatchScreen;
