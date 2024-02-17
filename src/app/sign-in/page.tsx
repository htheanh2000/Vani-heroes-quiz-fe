// pages/signin.tsx
import type { NextPage } from 'next';
import Button from '@/components/button';
import Input from '@/components/input';
import Counter from '@/components/counter';

const SignInPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
        <div className="space-y-4 mb-6">
          <Input
            label="phone number"
            placeholder="Your phonenumber"
          />
          <Input
          label="password"
            type="password"
            placeholder="Your password"
          />
        </div>
        <Counter></Counter>
        <Button className="w-full mb-3">
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
