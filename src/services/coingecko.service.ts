import axios from 'axios';
import {Price} from '../types/price';

const fetchCoin = async (
  coingeckoId: string[] | string,
): Promise<Price | []> => {
  try {
    if (!coingeckoId.length) {
      return [];
    }

    const {data}: any = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coingeckoId}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
    );

    return data
      .map((item: any) => {
        return {
          id: item.id,
          image: item.image,
          name: item.name,
          symbol: item.symbol,
          usd: item.current_price,
          usd24hChange: item.price_change_percentage_24h,
        };
      })
      .sort((a: any, b: any) => b.usd - a.usd);
  } catch (error) {
    throw error;
  }
};

const fetchCoinSuggestions = async (keyword: string) => {
  try {
    const {data}: any = await axios.get(
      'https://api.coingecko.com/api/v3/search',
      {
        params: {
          query: keyword,
        },
      },
    );

    return data.coins.map((item: any) => {
      return {
        ...item,
        title: item.name,
      };
    });
  } catch (error) {
    throw error;
  }
};

export default {fetchCoinSuggestions, fetchCoin};
