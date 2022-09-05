import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';

import {addRatingAction, fetchRatingsAction} from '../store/rating/actions';
import {ratingSelector} from '../store/rating/selector';
import RatingItem from '../component/RatingItem';
import {AirbnbRating} from 'react-native-ratings';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Rates = () => {
  const dispatch = useDispatch();

  const {loading, data} = useSelector(ratingSelector);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState({
    rating: 0,
    comment: '',
    name: 'Anonymous',
  });

  const fetchRatings = useCallback(
    () => dispatch(fetchRatingsAction()),
    [dispatch],
  );

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const onRefresh = () => {
    fetchRatings();
  };

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const onChangeText = (name: string, val: string) => {
    setRating(prev => {
      return {
        ...prev,
        [name]: val,
      };
    });
  };

  const handleRating = (val: number) => {
    setRating(prev => {
      return {
        ...prev,
        rating: val,
      };
    });
  };

  const handleSave = () => {
    dispatch(addRatingAction(rating));
    setRating({rating: 0, comment: '', name: 'Anonymous'});
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        data={data}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyExtractor={(sitem, index) => `item-${index}`}
        renderItem={({item}) => {
          return <RatingItem rating={item} />;
        }}
        ListHeaderComponent={
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
              <Text style={styles.buttonText}>Add Rating</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <Modal
        isVisible={isModalVisible}
        deviceWidth={windowWidth}
        deviceHeight={windowHeight}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContent}>
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>Enjoying the App?</Text>
            </View>
            <View>
              <AirbnbRating onFinishRating={handleRating} showRating={false} />
            </View>
            <View style={styles.textInput}>
              <TextInput
                onChangeText={(val: string) => onChangeText('name', val)}
                value={rating.name}
                placeholder="Name"
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                onChangeText={(val: string) => onChangeText('comment', val)}
                value={rating.comment}
                placeholder="Please leave a review"
                multiline
              />
            </View>

            <View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'column',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  textInput: {
    borderColor: '#FBD24D',
    borderWidth: 2,
    marginTop: 16,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    backgroundColor: '#FBD24D',
    padding: 12,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default Rates;
