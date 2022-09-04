import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Price} from '../types/price';

interface Props {
  price: Price;
}

const PriceItem = ({price}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={{uri: price.image}} />
        </View>
        <View style={styles.alignCenter}>
          <Text style={styles.title}>{price.name}</Text>
          <Text>{price.symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.alignCenter}>
        <View>
          <Text style={[styles.alignEnd, styles.price]}>$ {price.usd}</Text>
        </View>
        <View>
          <Text
            style={[
              styles.alignEnd,
              price.usd24hChange <= 0 ? styles.textRed : styles.textGreen,
            ]}>
            {(+price.usd24hChange).toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoContainer: {
    marginRight: 16,
  },
  logo: {
    width: 50,
    height: 50,
  },
  alignEnd: {
    textAlign: 'right',
  },
  textGreen: {
    color: 'green',
  },
  textRed: {
    color: 'red',
  },
});

export default PriceItem;
