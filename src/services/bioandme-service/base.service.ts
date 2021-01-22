import axios from 'axios';
import qs from 'qs';
import { RootState } from 'types';

import AuthSelectors from '../../redux/auth/auth.selectors';

const store: any = {};

const APIService = axios.create({
  baseURL: process.env.BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

APIService.interceptors.request.use(
  request => {
    const state = store.getState();
    const token = AuthSelectors.getAccessToken(state);
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    } else {
      request.headers.Authorization = null;
    }
    request.baseURL = process.env.REACT_APP_BACKEND_URL;
    request.paramsSerializer = params => qs.stringify(params);
    return request;
  },
  error => {
    Promise.reject(error);
  },
);

export default APIService;
