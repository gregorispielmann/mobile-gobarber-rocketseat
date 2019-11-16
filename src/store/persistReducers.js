import {persistReducer} from 'redux-persist';
import asyncStorage from '@react-native-community/async-storage';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
      storage: asyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );

  return persistedReducer;
};
