interface ModalBoxProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
  }
  
  const ModalBox: React.FC<ModalBoxProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="my-4">{message}</p>
          <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onClose}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ModalBox;
  