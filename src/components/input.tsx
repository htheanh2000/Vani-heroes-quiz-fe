"use client";
import { HTMLInputTypeAttribute } from "react";

type Props = {
  placeholder?: string;
  label?: string;
  className?: string;
  name?: string;
  onChange?: any;
  type?: HTMLInputTypeAttribute;
  value?: string;
  defaultInput?: boolean;
  id?: string;
};

const Input = (props: Props) => {
  const { label, id , placeholder } = props;

  return (
    <div className={placeholder}>
      {label && (
        <div className="pb-3 ml-1 capitalize font-medium">
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <div className="flex items-center">
        <input
          {...props}
          className={`w-full px-4 py-4 cursor-pointer outline rounded-sm outline-1 outline-gray/20 focus:outline-primary`}
        />
      </div>
    </div>
  );
};

export default Input;