import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as restaurantActions from '../store/restaurants/restaurantActions';
import Env from '../Env';
const RestaurantScreen = props => {
  const restaurants = useSelector(state => state.restaurants.restaurants);
  console.log('restaurants data', restaurants);
  const dispatch = useDispatch();

  const getRestaurants = useCallback(async () => {
    try {
      await dispatch(restaurantActions.getRestaurants());
    } catch (err) {
      console.warn('ERR-ROWR', err);
    }
  }, [dispatch]);

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);
  return (
    <View>
      <Text>Restaurant Screen</Text>
      <FlatList
        data={restaurants}
        keyExtractor={restaurant => restaurant.place_id}
        renderItem={restaurant => {
          return (
            <View>
              <Text style={styles.text}>
                {restaurant.item.name} |{' '}
                {restaurant.item.opening_hours.open_now.toString()}
              </Text>
              <Image
                style={styles.image}
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.item.photos[0].photo_reference}&key=${Env.GOOGLE_MAPS_KEY}`,
                }}
              />
            </View>
          );
        }}
      />
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
});

export default RestaurantScreen;
