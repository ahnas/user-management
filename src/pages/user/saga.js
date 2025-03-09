import { call, put, takeLatest, all, fork, take } from 'redux-saga/effects';
import { fetchUser, createUser, updateUserEmail, fetchUsers } from './api';
import { ACTION_TYPES } from './actions';
import { actions as sliceActions } from './slice';
import { handleAPIRequest } from '../../utils/http';
import axios from 'axios';

export function* fetchUsersRequest() {
  try {
    yield call(handleAPIRequest, fetchUsers);

    const { payload, type } = yield take([ACTION_TYPES.FETCH_USERS_SUCCESS, ACTION_TYPES.FETCH_USERS_FAILURE]);

    if (type === ACTION_TYPES.FETCH_USERS_SUCCESS) {
      console.log('Fetched users successfully:', payload);
    } else {
      console.log('Failed to fetch users:',);
    }

  } catch (error) {
    console.log('Error in saga:', error);
  }
}

function* createUserSaga(action) {
  try {
    const createUserApi = createUser(action.payload);
    console.log("createUserSaga triggered:", createUserApi.payload.data);
    const response = yield call(axios.post, createUserApi.url, createUserApi.payload.data);
    console.log("API Response:", response.data);
    yield put({ type: ACTION_TYPES.CREATE_USER_SUCCESS, payload: response.data });
    yield put({ type: ACTION_TYPES.FETCH_USERS });
  } catch (error) {
    console.error("API Error:", error);
    yield put({ type: ACTION_TYPES.CREATE_USER_FAILURE, payload: error.message });
  }
}

export function* fetchUserRequest({ payload }) {
  try {

    yield call(handleAPIRequest, fetchUser, payload);

    const { payload: response, type } = yield take([ACTION_TYPES.FETCH_USER_SUCCESS, ACTION_TYPES.FETCH_USER_FAILURE]);

    if (type === ACTION_TYPES.FETCH_USER_SUCCESS) {
      console.log('Fetched users successfully:', response);
    } else {
      console.log('Failed to fetch users:',);
    }

  } catch (error) {
    console.log('Error in saga:', error);
  }
}


export function* updateUserEmailRequest({ payload }) {
  try {
    yield call(handleAPIRequest, updateUserEmail, payload.userId, payload.email);

    const { payload: response, type } = yield take([ACTION_TYPES.FETCH_USERS_SUCCESS, ACTION_TYPES.FETCH_USERS_FAILURE]);

    if (type === ACTION_TYPES.FETCH_USERS_SUCCESS) {
      console.log('Updated user successfully:', response);
    } else {
      console.log('Failed to fetch users:',);
    }
  } catch (error) {
    console.log('Error in saga:', error);
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(ACTION_TYPES.FETCH_USERS, fetchUsersRequest),
    takeLatest(ACTION_TYPES.CREATE_USER, createUserSaga),
    takeLatest(ACTION_TYPES.FETCH_USER, fetchUserRequest),
    takeLatest(ACTION_TYPES.UPDATE_USER_EMAIL, updateUserEmailRequest),
  ]);
}
