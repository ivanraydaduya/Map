import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

import {RatingType} from '../types/rating';

interface Props {
  rating: RatingType;
}

const RatingItem = ({rating}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={{uri: 'https://i.pravatar.cc/1000'}}
            style={styles.logo}
          />
        </View>
        <View>
          <View style={styles.name}>
            <Text>{rating.name}</Text>
          </View>
          <View>
            <AirbnbRating
              defaultRating={rating.rating}
              size={16}
              showRating={false}
              isDisabled
              ratingContainerStyle={styles.ratingContainerStyle}
            />
          </View>
        </View>
      </View>
      <View style={styles.commentContainer}>
        <Text>{rating.comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  name: {
    marginLeft: 2,
  },
  ratingContainerStyle: {
    alignItems: 'flex-start',
  },
  commentContainer: {
    marginTop: 16,
  },
  logoContainer: {
    marginRight: 8,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default RatingItem;
