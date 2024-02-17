import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
    incrementedByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Export actions
export const { incremented, decremented, incrementedByAmount } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
