"use client"
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { incremented } from '@/store/features/counter/counterSlice';

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(incremented())}>Increment</button>
      {/* ... */}
    </div>
  );
};

export default Counter;
