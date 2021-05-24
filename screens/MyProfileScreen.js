import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import * as userActions from '../store/user/userActions';

const MyProfileScreen = props => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={styles.profileImage}
        source={require('../assets/personWithFork.png')}
      />
      <Text style={styles.text}>Go fork what you're after</Text>
      <View style={styles.authWrapper}>
        <TouchableOpacity
          onPress={
            () => props.navigation.navigate('auth')
            // dispatch(userActions.signup('fakeEmail@fakeEmail.com', '123abc'))
          }>
          <Text style={styles.underline}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.or}>or</Text>
        <TouchableOpacity onPress={() => dispatch(userActions.login())}>
          <Text style={styles.underline}>Login</Text>
        </TouchableOpacity>
      </View>
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
  authWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
  },
  underline: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  or: {
    paddingHorizontal: 10,
  },
});

export default MyProfileScreen;
