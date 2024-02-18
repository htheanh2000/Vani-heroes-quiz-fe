// src/features/user/userSlice.ts
import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface QuizState {
  quizid: string;
  questions: any;
  // include other user details as needed
  status: 'idle' | 'loading' | 'failed';
}

const initialState: QuizState = {
    quizid: '',
    questions: '',
    status: 'idle',
};

// Async thunk for signing in
export const getQuizById = createAsyncThunk(
  'quiz/getById', 
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/quizzes/${id}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unable to get quiz';
      return rejectWithValue(message);
    }
  }
);


export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // Add any synchronous reducers here if necessary
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getQuizById.fulfilled, (state, action) => {
        state.questions = action.payload.questions;
        state.status = 'idle';
        // set other user data here
      })
      .addCase(getQuizById.rejected, (state) => {
        state.status = 'failed';
      })
      
  },
});

export default quizSlice.reducer;
