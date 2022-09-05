import axios from 'axios';
import {RatingType} from '../types/rating';

const fetchCompanies = () => {
  return axios.get(
    'https://task-exam-default-rtdb.asia-southeast1.firebasedatabase.app/companies.json',
  );
};

const fetchRatings = () => {
  return axios.get(
    'https://task-exam-default-rtdb.asia-southeast1.firebasedatabase.app/ratings.json',
  );
};

const addRating = (data: RatingType) => {
  return axios.post(
    'https://task-exam-default-rtdb.asia-southeast1.firebasedatabase.app/ratings.json',
    data,
  );
};

export default {fetchCompanies, fetchRatings, addRating};
