import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {YELP_KEY} from '../constants/Env';

const RestaurantScreen = props => {
  const userLocation = useSelector(state => state.user);
  console.log('user location inside restaurant screen', userLocation);
  useEffect(() => {
    const getYelp = async () => {
      // use google places instead
      // const response = await fetch(
      //   `https://api.yelp.com/v3/businesses/search?location=New%20York%20City?categories=restaurants`,
      //   {
      //     method: 'GET',
      //     headers: {
      //       Authorization: 'Bearer ' + YELP_KEY,
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );
      // const response = await fetch(
      //   `https://api.yelp.com/v3/businesses/search?location=New%20York%20City?categories=restaurants`,
      //   {
      //     method: 'GET',
      //     headers: {
      //       Authorization: 'Bearer ' + YELP_KEY,
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );
    };
    getYelp();
  }, []);
  return (
    <View>
      <Text>Restaurant Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RestaurantScreen;
