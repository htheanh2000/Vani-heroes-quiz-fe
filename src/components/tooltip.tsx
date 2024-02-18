import { ReactNode, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts'

interface TooltipProps {
  message: string;
  children: ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  const [show, setShow] = useState(false);
  const tooltipRef = useRef(null)

  const handleClickOutside = () => {
    // Your custom logic here
    console.log('clicked outside')
    setShow(false)
  }

  const toggleTooltip = () => {
    setShow(!show);
  };

  useOnClickOutside(tooltipRef, handleClickOutside)


  return (
    <div className="flex relative flex-col  ">
      <div ref={tooltipRef} onClick={toggleTooltip} className="cursor-pointer">
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
