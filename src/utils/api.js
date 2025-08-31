export const API_BASE_URL = 'http://localhost:4000/api';

export const endpoints = {
  auth: {
    login: '/auth/login',
  },
  breakingNews: {
    list: '/breaking-news',
    create: '/breaking-news',
  },
  categories: {
    list: '/categories',
    create: '/categories',
  },
  media: {
    upload: '/media',
  },
  news: {
    list: '/news',
    create: '/news',
  },
  staticPages: {
    list: '/static-pages',
    create: '/static-pages',
  },
  tickers: {
    list: '/tickers',
    create: '/tickers',
  },
  ads: {
    list: '/ads',
    create: '/ads',
  },
  users: {
    list: '/users',
    create: '/users',
  },
  posters: {
    list: '/posters',
    update: '/posters',
  }
};

export const createApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
