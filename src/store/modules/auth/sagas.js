import { Alert } from 'react-native';
import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    if (user.provider) {
      throw new Error('Usuário é prestador');
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield delay(3000);

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Erro no acesso',
      'Falha na autenticação. Verifique seus dados.'
    );

    console.tron.error(error);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (error) {
    Alert.alert('Erro no cadastro', 'Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
