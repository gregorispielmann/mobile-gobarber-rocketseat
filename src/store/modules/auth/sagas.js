import {Alert} from 'react-native';
import {all, takeLatest, call, put, delay} from 'redux-saga/effects';

import api from '~/services/api';

import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const res = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const {token, user} = res.data;

    if (user.provider) {
      Alert.alert('Erro', 'Usuário não pode ser prestador de serviço');
      return;
    }

    yield delay(3000);

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (e) {
    Alert.alert('Falha na autenticação', 'Verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (e) {
    Alert.alert('Falha no cadastro! Verifique seus dados!');

    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) return;

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
