import React from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
  Image,
} from 'react-native';

const Card = props => {
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const position = new Animated.ValueXY();
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });
  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });
  const rotateAndTranslate = {
    transform: [
      {
        rotate: rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };
  const panResponderThing = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({x: gestureState.dx, y: gestureState.dy});
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        // swipe right
        Animated.spring(position, {
          toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
          useNativeDriver: true,
        }).start(() => {
          props.onSetCurrentIndex(props.currentIndex + 1);
        });
      } else if (gestureState.dx < -120) {
        // swipe left
        Animated.spring(position, {
          toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
          useNativeDriver: true,
        }).start(() => {
          props.onSetCurrentIndex(props.currentIndex + 1);
        });
      } else {
        Animated.spring(position, {
          toValue: {x: 0, y: 0},
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  return (
    <Animated.View
      key={props.key}
      {...panResponderThing.panHandlers}
      style={[
        rotateAndTranslate,
        {
          height: SCREEN_HEIGHT - 120,
          width: SCREEN_WIDTH,
          padding: 10,
          position: 'absolute',
          zIndex: 2,
        },
      ]}>
      <Animated.View
        style={{
          opacity: likeOpacity,
          transform: [{rotate: '-30deg'}],
          position: 'absolute',
          top: 50,
          left: 40,
          zIndex: 1000,
        }}>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'green',
            color: 'green',
            fontSize: 32,
            fontWeight: '800',
            padding: 10,
          }}>
          LIKE
        </Text>
      </Animated.View>
      <Animated.View
        style={{
          opacity: nopeOpacity,
          transform: [{rotate: '30deg'}],
          position: 'absolute',
          top: 50,
          right: 40,
          zIndex: 1000,
        }}>
        <Text
          style={{
            borderWidth: 1,
            borderColor: 'red',
            color: 'red',
            fontSize: 32,
            fontWeight: '800',
            padding: 10,
          }}>
          NOPE
        </Text>
      </Animated.View>
      {props.image ? (
        <Image
          style={{
            flex: 1,
            height: null,
            width: null,
            resizeMode: 'cover',
            borderRadius: 20,
          }}
          source={{
            uri: props.image,
          }}
        />
      ) : null}
      <Text
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          zIndex: 1000,
          color: 'white',
          fontSize: 20,
          padding: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}>
        {props.title}
        {'\n'}
        {props.moreInfo}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default Card;
