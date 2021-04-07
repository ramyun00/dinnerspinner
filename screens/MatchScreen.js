import React, {useRef, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  Linking,
  Alert,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Env from '../Env';

const MatchScreen = props => {
  const foodData = props.route.params.foodData;
  const beatAnimation = useRef(new Animated.Value(40)).current;
  const openLink = async type => {
    let url = '';
    if (type === 'google') {
      url = `https://www.google.com/maps/search/?api=1&query=${foodData.geometry.location.lat},${foodData.geometry.location.lng}&query_place_id=${foodData.place_id}`;
    } else {
      url = foodData.recipe.url;
    }
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Can't open this link");
    }
  };

  useEffect(() => {
    Animated.timing(beatAnimation, {
      toValue: 70,
      easing: Easing.elastic(10),
      duration: 6000,
      useNativeDriver: false,
    }).start();
  }, [beatAnimation]);

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          padding: 20,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{position: 'absolute', right: 20, top: 20}}>
          <Icon name="close-circle-outline" size={30} />
        </TouchableOpacity>

        <Text style={{fontSize: 30, width: '90%', marginBottom: 20}}>
          {foodData.name || foodData.recipe.label}
        </Text>
        <Text
          style={{
            fontFamily: 'DancingScript-Regular',
            textAlign: 'center',
            fontSize: 55,
            marginBottom: 20,
          }}>
          It's a match!
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
            justifyContent: 'center',
            width: '100%',
            marginBottom: 40,
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              marginRight: 40,
            }}>
            <Image
              style={{
                resizeMode: 'cover',
                height: '100%',
                width: '100%',
                borderRadius: 100 / 2,
              }}
              source={{
                uri: foodData.business_status
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${foodData.photos[0].photo_reference}&key=${Env.GOOGLE_MAPS_KEY}`
                  : foodData.recipe.image,
              }}
            />
          </View>
          <Animated.View
            style={{
              position: 'absolute',
              zIndex: 10,
              height: beatAnimation,
              width: beatAnimation,
              borderRadius: 50 / 2,
            }}>
            <Image
              style={{
                resizeMode: 'cover',
                height: '100%',
                width: '100%',
                borderRadius: 50 / 2,
              }}
              source={require('../assets/heart.png')}
            />
          </Animated.View>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: 'pink',
              borderRadius: 100 / 2,
            }}>
            <Image
              style={{
                resizeMode: 'cover',
                height: '100%',
                width: '100%',
                borderRadius: 100 / 2,
              }}
              source={require('../assets/personWithFork.png')}
            />
          </View>
        </View>
        {foodData.business_status ? (
          // Restaurant content
          <View>
            {/* Wrapper for profile pictures */}

            <View>
              <Image
                style={{width: '100%', height: 200}}
                source={{
                  uri: `https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=300x300&maptype=roadmap&markers=color:green%7Clabel:%7C${foodData.geometry.location.lat},${foodData.geometry.location.lng}&key=${Env.GOOGLE_MAPS_KEY}`,
                }}
              />
            </View>
            <View style={{marginVertical: 20, flex: 1}}>
              <Button
                onPress={() => openLink('google')}
                title="Open in Google Maps"
              />
            </View>
          </View>
        ) : (
          // Recipe content
          <View>
            <Text style={{marginBottom: 20}}>
              Approximate time:&nbsp;
              {foodData.recipe.totalTime == 0
                ? 'Unknown'
                : foodData.recipe.totalTime + ' min'}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Ingredients</Text>
            {foodData.recipe.ingredientLines.map((ingredient, i) => (
              <Text key={i}>{ingredient}</Text>
            ))}
            <Text style={{textAlign: 'center', marginTop: 20}}>
              Source: {foodData.recipe.source}
            </Text>
            <View style={{marginVertical: 20, flex: 1}}>
              <Button onPress={() => openLink('recipe')} title="Go to recipe" />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default MatchScreen;
