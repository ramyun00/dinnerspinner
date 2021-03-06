import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as cookActions from '../store/cook/cookActions';
import {stripAmpersand} from '../util/util';

const CookScreen = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const recipes = useSelector(state => state.recipes.recipes);

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
          setCurrentIndex(currentIndex + 1);
          props.navigation.navigate('match', {
            foodData: recipes[currentIndex],
          });
        });
      } else if (gestureState.dx < -120) {
        // swipe left
        Animated.spring(position, {
          toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
          useNativeDriver: true,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
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

  useEffect(() => {
    position.setValue({x: 0, y: 0});
  }, [currentIndex]);

  const dispatch = useDispatch();

  const getRecipes = useCallback(async () => {
    try {
      await dispatch(cookActions.getRecipes());
    } catch (err) {
      console.warn('Get recipes action failed', err);
    }
  }, [dispatch]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  return (
    <View style={{flex: 1}}>
      <View style={{height: 30}} />
      <View style={{flex: 1}}>
        {recipes
          .map((recipe, i) => {
            if (i < currentIndex) {
              return null;
            } else if (i == currentIndex) {
              // The current card on top
              return (
                <Animated.View
                  key={recipe.recipe.uri}
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
                    <Text style={styles.likeText}>LIKE</Text>
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
                    <Text style={styles.nopeText}>NOPE</Text>
                  </Animated.View>
                  {recipe.recipe.image ? (
                    <Image
                      style={styles.recipeImage}
                      source={{
                        uri: recipe.recipe.image,
                      }}
                    />
                  ) : null}
                  <View style={styles.recipeTitleWrapper}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        padding: 10,
                      }}>
                      {stripAmpersand(recipe.recipe.label)}
                    </Text>
                  </View>
                </Animated.View>
              );
            } else {
              return (
                <Animated.View
                  key={recipe.recipe.uri}
                  style={{
                    opacity: nextCardOpacity,
                    transform: [{scale: nextCardScale}],
                    height: SCREEN_HEIGHT - 120,
                    width: SCREEN_WIDTH,
                    padding: 10,
                    position: 'absolute',
                    zIndex: 2,
                  }}>
                  {recipe.recipe.image ? (
                    <Image
                      style={styles.recipeImage}
                      source={{
                        uri: recipe.recipe.image,
                      }}
                    />
                  ) : null}
                </Animated.View>
              );
            }
          })
          .reverse()}
      </View>
      <View style={{height: 60}} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 20,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  likeText: {
    borderWidth: 1,
    borderColor: 'green',
    color: 'green',
    fontSize: 32,
    fontWeight: '800',
    padding: 10,
    fontWeight: 'bold',
  },
  nopeText: {
    borderWidth: 1,
    borderColor: 'red',
    color: 'red',
    fontSize: 32,
    fontWeight: '800',
    padding: 10,
    fontWeight: 'bold',
  },
  recipeImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  recipeTitleWrapper: {
    width: '90%',
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default CookScreen;
