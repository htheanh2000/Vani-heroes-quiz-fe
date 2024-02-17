"use client"
import type { NextPage } from 'next';
import Button from '@/components/button';
import Input from '@/components/input';
import Counter from '@/components/counter';
import {  useRef, useState, } from 'react';
import { useAppDispatch } from '@/store/store';
import { signIn } from '@/store/features/user/userSlice';

const SignInPage: NextPage = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleLogin =()=> {
    console.log("phonenumber", phoneNumber);
    console.log("password", password);
    dispatch(signIn({ phoneNumber, password }));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
        <div className="space-y-4 mb-6">
          <Input
             value={phoneNumber || ''}
            onChange={(e:any) => setPhoneNumber(e.currentTarget.value)}
            label="phone number"
            placeholder="Your phonenumber"
          />
          <Input
          value={password || ''}
          onChange={(e:any) => setPassword(e.currentTarget.value)}
          label="password"
            type="password"
            placeholder="Your password"
          />
        </div>
        <Counter></Counter>
        <Button onClick={handleLogin} className="w-full mb-3">
          Login
        </Button>

        <div className="text-center">
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        <p className="text-xs text-center text-gray mt-6">
          By continuing, you agree to the <strong>Terms of Services & Privacy Policy.</strong>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
