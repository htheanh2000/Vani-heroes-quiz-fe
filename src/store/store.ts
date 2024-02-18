// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import your reducers here
import counterReducer from './features/counter/counterSlice';
import quizSlice from './features/quiz/quizSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    quiz: quizSlice
    // Add your reducers here
  },
});

// Type definitions for use throughout your app
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Typed hooks allowing you to use them instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
