import { useEffect } from "react";

const Modal = ({ isOpen, handleClose, children }) => {
  // Make the background non-scrollable when the modal is open,
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Stop rendering when isOpen == false
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      {/* Close On Background Click (If handleClose is passed via parent component) */}
      {handleClose && (
        <div className="fixed inset-0" onClick={handleClose}></div>
      )}

      {/* Modal container */}
      <div className="z-50">{children}</div>
    </div>
  );
};

export default Modal;
