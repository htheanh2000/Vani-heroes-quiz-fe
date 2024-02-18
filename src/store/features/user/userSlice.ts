// src/features/user/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface UserState {
  username: string;
  phonenumber:string;
  error: string;
  // include other user details as needed
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  error: '' ,
  phonenumber: '',
  username: '',
  status: 'idle',
};

// Async thunk for signing in
export const signIn = createAsyncThunk(
  'user/signIn',
  async ({ phonenumber, password }: { phonenumber: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phonenumber, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to sign in');
      }

      return data.dataValues; // Assuming this is the user data you want to store -> shoule be access_token
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing up
export const signUp = createAsyncThunk(
  'user/signUp',
  async ({ phonenumber, username, password }: { phonenumber: string; username:string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phonenumber,username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to sign up');
      }

      return data.dataValues; // Assuming this is the user data you want to store -> shoule be access_token
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      logout: () => {
        localStorage.removeItem('access_token');
      },
      clearUserState: (state) => {
        state.status = 'idle'
        state.error = ''
      },
    // Add any synchronous reducers here if necessary
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        localStorage.setItem('access_token', JSON.stringify(action.payload.access_token))
        state.status = 'idle';
      })
      .addCase(signIn.rejected, (state,action: any) => {
        state.status = 'failed';
        state.error = action.payload 
      })
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log("action.payload",action.payload);
        
        localStorage.setItem('access_token', JSON.stringify(action.payload.access_token))
        state.status = 'idle';
      })
      .addCase(signUp.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logout, clearUserState } = userSlice.actions


export default userSlice.reducer;
