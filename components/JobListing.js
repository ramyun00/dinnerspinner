import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const JobListing = props => {
  return (
    <View style={{...styles.jobListing, ...props.style}}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Icon name="bookmark-outline" size={20} style={styles.saveJobListing} />
      </View>

      <Text style={styles.company}>{props.item.company}</Text>
      <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
        {props.item.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  jobListing: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 5,
  },
  headerWrapper: {
    flexDirection: 'row',
  },
  saveJobListing: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 18,
  },
  company: {
    fontSize: 16,
  },
  description: {},
});

export default JobListing;
