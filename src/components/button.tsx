import type { ReactNode } from 'react';

const STYLES = {
    primary: {
        bg: 'bg-primary',
        'text-color': 'text-white',
    },
};

const SIZES = {
    md: 'px-16 py-4 mt-9',
    lg: 'px-16 py-4 mt-9'
}

type TProps = {
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
    } = props;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`self-stretch  text-white whitespace-nowrap bg-primary rounded-3xl flex cursor-pointer w-full items-center justify-center ${STYLES[style].bg} ${SIZES[size]} text-base font-medium ${STYLES[style]['text-color']} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;