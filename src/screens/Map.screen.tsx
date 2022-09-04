import React, {useCallback, useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTokensAction} from '../store/token/actions';
import {tokenSelector} from '../store/token/selector';

import FloorPlan from '../assets/floorplan.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({navigation}: any) => {
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
      <View style={{backgroundColor: 'red'}}>
        <Image
          source={FloorPlan}
          style={{
            width: windowWidth,
            // height: windowHeight,
            resizeMode: 'contain',
          }}
        />
      </View>
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

export default Home;
