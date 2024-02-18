import type { ReactNode } from 'react';

const STYLES = {
    primary: {
        bg: 'bg-primary',
        'text-color': 'text-white',
    },
    secondary: {
        bg: 'bg-white',
        'text-color': 'text-primary',
    },
};

const SIZES = {
    md: 'px-16 py-4 mt-9',
    lg: 'px-16 py-4 mt-9'
}

type TProps = {
    loading?: boolean;
    className?: string;
    children?: ReactNode;
    style?: keyof typeof STYLES;
    size?: keyof typeof SIZES;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean
};

const Button = (props: TProps) => {
    const {

        children,
        style = 'primary',
        onClick,
        className = '',
        size = 'md',
        type = 'button',
        disabled = false,
        loading= false
    } = props;

    if (loading) {
        return (
          <button
            type={type}
            disabled
            className={`self-stretch whitespace-nowrap bg-primary rounded-3xl flex cursor-pointer w-full items-center justify-center ${STYLES[style].bg} ${SIZES[size]} text-base font-medium ${STYLES[style]['text-color']} ${className}`}
          >
            <svg
              className="animate-spin h-5 w-5 mr-3 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {children}
          </button>
        )}
        return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`self-stretch whitespace-nowrap bg-primary rounded-3xl flex cursor-pointer w-full items-center justify-center ${STYLES[style].bg} ${SIZES[size]} text-base font-medium ${STYLES[style]['text-color']} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;