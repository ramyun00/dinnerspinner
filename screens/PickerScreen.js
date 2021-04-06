import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Colors from '../constants/Colors';

const PickerScreen = props => {
  const arrowRef = useRef();
  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: Math.random() * 10 + 1,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      const numOfDegrees = parseFloat(
        rotateValueHolder
          .interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          })
          .__getValue(),
      );
      console.log(numOfDegrees);
      console.log(numOfDegrees % 360);
      if (numOfDegrees % 360 < 180) {
        console.log('restaurant wins');
        Alert.alert('Time to put pants on!', '', [
          {
            text: 'Yay restaurant!',
            onPress: () => props.navigation.navigate('restaurant'),
          },
          {text: 'Nah', style: 'cancel'},
        ]);
      } else {
        Alert.alert('Do you have anything in the fridge?', '', [
          {text: 'Womp womp', onPress: () => props.navigation.navigate('cook')},
          {text: 'Reject cooking', style: 'cancel'},
        ]);
      }
    });
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.picker}>
      <View style={styles.cook}>
        <Text style={styles.optionText}>Cook</Text>
      </View>
      <View style={styles.spinner}>
        <TouchableOpacity onPress={startImageRotateFunction}>
          <Animated.Image
            ref={arrowRef}
            style={{
              width: 200,
              height: 100,
              transform: [{rotate: rotateData}],
            }}
            source={require('../assets/arrow.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.restaurant}>
        <Text style={styles.optionText}>Restaurant</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dinnerSpinner: {
    flex: 1,
    height: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  cook: {
    height: '50%',
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  spinnerImage: {
    // width: 300,
    resizeMode: 'contain',
  },
  restaurant: {
    height: '50%',
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: 'white',
    fontSize: 30,
  },
});

export default PickerScreen;
