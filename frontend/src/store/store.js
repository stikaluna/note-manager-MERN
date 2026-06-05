import { configureStore } from '@reduxjs/toolkit';

//  slices
import userReducer from './slices/userSlice';

//  apis
import { userApi } from './apis/userApi';
import { noteApi } from './apis/noteApi';

export const store = configureStore({
  reducer: {
    user: userReducer,

    //  API reducers
    [userApi.reducerPath]: userApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(noteApi.middleware),
});