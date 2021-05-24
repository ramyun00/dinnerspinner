import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Colors from '../constants/Colors';
import * as userActions from '../store/user/userActions';
import {useDispatch, useSelector} from 'react-redux';
import ErrorMessages from '../constants/Errors';

const AuthScreen = props => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const dispatch = useDispatch();
  const authErrors = useSelector(state => state.errors.user);
  return (
    <View style={styles.authScreen}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Sign Up</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text>E-Mail:</Text>
        <TextInput
          style={styles.input}
          id="email"
          label="E-Mail"
          keyboardType="email-address"
          required
          email
          autoCapitalize="none"
          onChangeText={value => setEmailInput(value)}
          placeholder="Email"
        />
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          id="password"
          label="Password"
          keyboardType="default"
          required
          secureTextEntry
          minLength={5}
          autoCapitalize="none"
          errorText="Please enter a valid password"
          onChangeText={value => setPasswordInput(value)}
          placeholder="Password"
        />
        <Text>
          {authErrors.message !== '' && ErrorMessages[authErrors.message]}
        </Text>
      </View>
      <Button
        title="Sign Up"
        color={Colors.primary}
        onPress={() => dispatch(userActions.signup(emailInput, passwordInput))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
  },
  authScreen: {
    padding: 10,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '100%',
    height: 30,
    padding: 0,
    marginVertical: 10,
    color: 'black',
  },
});
export default AuthScreen;
