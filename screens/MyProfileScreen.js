import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const MyProfileScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={styles.profileImage}
        source={require('../assets/personWithFork.png')}
      />
      <Text>Go fork what you're after</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'pink',
    marginBottom: 10,
  },
});

export default MyProfileScreen;
