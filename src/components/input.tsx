"use client"
import { forwardRef, HTMLInputTypeAttribute, useImperativeHandle, useRef } from 'react'
type Props = {
  placeholder?: string
  label?: string
  className?: string
  name?: string
  onChange?:  any
  type?: HTMLInputTypeAttribute
  value?: string
}

export interface InputRef extends  HTMLInputElement  {
  getValue: () => string
}

const Input = forwardRef((props: Props, ref, ) => {
  const { placeholder, label, className, onChange, name = '', type , value } = props
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => ({
    getValue: () => inputRef?.current?.value,
  }))

  return (
    <div className={`${className}`}>
      <label htmlFor={label} className="lead capitalize">
        {label}
      </label>
      <div className="mt-4">
        <input
          onChange={onChange}
          type={type}
          id={label}
          name={name}
          ref={inputRef}
          value={value}
          className={`w-full px-4 py-3 cursor-pointer base-text text-black outline rounded  outline-1 outline-gray focus:outline-primary`}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
})

Input.displayName = 'Input'

export default Input