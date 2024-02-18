import { ReactNode, useState } from 'react';

interface TooltipProps {
  message: string;
  children: ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  const [show, setShow] = useState(false);

  const toggleTooltip = () => {
    setShow(!show);
  };

  return (
    <div className="flex relative flex-col  ">
      <div onClick={toggleTooltip} className="cursor-pointer">
        {children}
      </div>
      {show && (
        <div className="absolute  border-primary shadow-xl top-10 
         left-0 bg-white px-4 py-2 text-black w-full min-w-80 rounded-md">
          <span>Hints:</span>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
