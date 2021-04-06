import React, {useState, useEffect} from 'react';
import {Text, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import GetLocation from 'react-native-get-location';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, useDispatch} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PickerScreen from './screens/PickerScreen';
import ProfileScreen from './screens/MyProfileScreen';
import CookScreen from './screens/CookScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from './constants/Colors';
import RestaurantScreen from './screens/RestaurantScreen';
import MatchScreen from './screens/MatchScreen';

import restaurantReducer from './store/restaurants/restaurantReducer';
import userReducer from './store/user/userReducer';
import * as userActions from './store/user/userActions';
import cookReducer from './store/cook/cookReducer';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const rootReducer = combineReducers({
  restaurants: restaurantReducer,
  recipes: cookReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  const dispatch = useDispatch();
  const getUserLocation = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Coarse location permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
          .then(location => {
            dispatch(userActions.setUserLocation(location));
          })
          .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
          });
      }
    } catch (err) {
      console.log('Failed to get user location', err);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  function MainStackScreen() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'picker') {
              iconName = 'trail-sign-outline';
            } else if (route.name === 'cook') {
              iconName = 'book-outline';
            } else if (route.name === 'restaurant') {
              iconName = 'fast-food-outline';
            } else if (route.name === 'profile') {
              iconName = 'person-outline';
            }

            return <Icon name={iconName} size={20} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: Colors.primary,
          inactiveTintColor: Colors.icon,
        }}>
        <Tab.Screen
          name="picker"
          component={PickerScreen}
          options={{title: 'Picker'}}
        />
        <Tab.Screen
          name="cook"
          component={CookScreen}
          options={{title: 'Cook'}}
        />
        <Tab.Screen
          name="restaurant"
          component={RestaurantScreen}
          options={{title: 'Restaurant'}}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{title: 'My Profile'}}
        />
      </Tab.Navigator>
    );
  }

  function RootStackScreen() {
    return (
      <RootStack.Navigator mode="modal">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="MyModal" component={MatchScreen} />
      </RootStack.Navigator>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
};

const appWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default appWrapper;
