import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Map from './screens/Map.screen';
import Rates from './screens/Rates.screen';

import configureStore from './store';

const {store, persistor} = configureStore();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Map"
              component={Map}
              options={{
                tabBarIcon: () => (
                  <Ionicons name="map-outline" size={30} color="black" />
                ),
              }}
            />
            <Tab.Screen
              name="Ratings"
              component={Rates}
              options={{
                tabBarIcon: () => (
                  <Ionicons name="star" size={30} color="black" />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
