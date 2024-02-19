import React from 'react';

interface OverlayViewProps {
  closeHandler?: () => void;
  children?: React.ReactNode;
}

const OverlayView: React.FC<OverlayViewProps> = ({ closeHandler, children }) => {
  return (
    <div className='view'>
      {closeHandler && (
        <div className="action_button_wrapper" style={{ zIndex: 3 }}>
          <button onClick={closeHandler}>X</button>
        </div>
      )}
      {children}
    </div>
  );
};

export default OverlayView;
