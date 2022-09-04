import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PriceItem from '../component/PriceItem';
import {fetchTokensAction} from '../store/token/actions';
import {tokenSelector} from '../store/token/selector';

const Rates = ({navigation}: any) => {
  const dispatch = useDispatch();

  const {loading, data} = useSelector(tokenSelector);

  const fetchToken = useCallback(
    () => dispatch(fetchTokensAction()),
    [dispatch],
  );

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  const onRefresh = () => {
    fetchToken();
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
          return <PriceItem price={item} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    flex: 1,
    marginTop: 8,
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
