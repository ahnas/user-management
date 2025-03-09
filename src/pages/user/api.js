import { API_URL } from '../../../shared/urls';
import { REQUEST_METHOD } from './constants';
import { ACTION_TYPES } from './actions';

export const fetchUsers = () => {
  return {
    url: API_URL.USERS.FETCH_USERS,
    method: REQUEST_METHOD.GET,
    payload: {
      types: [
        ACTION_TYPES.FETCH_USERS_REQUEST,
        ACTION_TYPES.FETCH_USERS_SUCCESS,
        ACTION_TYPES.FETCH_USERS_FAILURE,
      ],
    },
  };
};
export const fetchUser = ({ userId }) => {
  return {
    url: API_URL.USERS.FETCH_USER.replace(':id', userId),
    method: REQUEST_METHOD.GET,
    payload: {
      types: [
        ACTION_TYPES.FETCH_USER_REQUEST,
        ACTION_TYPES.FETCH_USER_SUCCESS,
        ACTION_TYPES.FETCH_USER_FAILURE,
      ],
    },
  };
};

export const createUser = (user) => ({
  url: API_URL.USERS.CREATE_USER,
  method: REQUEST_METHOD.POST,
  payload: {
    types: [
      ACTION_TYPES.CREATE_USER_REQUEST,
      ACTION_TYPES.CREATE_USER_SUCCESS,
      ACTION_TYPES.CREATE_USER_FAILURE,
    ],
    data: user,
  },
});



export const updateUserEmail = (userId, email) => {
  return {
    url: API_URL.USERS.UPDATE_USER_EMAIL.replace(':id', userId),
    method: REQUEST_METHOD.PATCH,
    payload: {
      types: [
        ACTION_TYPES.UPDATE_USER_EMAIL_REQUEST,
        ACTION_TYPES.UPDATE_USER_EMAIL_SUCCESS,
        ACTION_TYPES.UPDATE_USER_EMAIL_FAILURE,
      ],
      data: { email },
    },
  };
};
