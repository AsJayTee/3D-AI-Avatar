import React, { useState, useEffect } from 'react';
import { AvatarCreator } from "@readyplayerme/react-avatar-creator";

// Define animation keyframes as a styled component
const AnimationStyles = () => (
  <style jsx="true">{`
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; transform: scale(1) translateY(0); }
      to { opacity: 0; transform: scale(0.95) translateY(10px); }
    }
    
    .modal-enter {
      animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .modal-exit {
      animation: fadeOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `}</style>
);

const AvatarCreatorModal = ({ isOpen, onClose, onAvatarExported }) => {
  const [animationState, setAnimationState] = useState('closed'); // 'closed', 'opening', 'open', 'closing'
  
  // Handle animation state changes
  useEffect(() => {
    if (isOpen && animationState === 'closed') {
      setAnimationState('opening');
      const timer = setTimeout(() => {
        setAnimationState('open');
      }, 50); // Small delay to ensure CSS transition starts properly
      return () => clearTimeout(timer);
    } 
    else if (!isOpen && (animationState === 'open' || animationState === 'opening')) {
      setAnimationState('closing');
      const timer = setTimeout(() => {
        setAnimationState('closed');
      }, 400); // Match this to the animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, animationState]);
  
  // Don't render anything if completely closed
  if (animationState === 'closed' && !isOpen) return null;
  
  const config = {
    clearCache: true,
    bodyType: "fullbody",
    quickStart: false,
    language: "en",
  };

  const style = { width: "100%", height: "100%", border: "none" };

  const handleClose = () => {
    onClose();
  };

  const handleOnAvatarExported = (event) => {
    console.log(`Avatar URL is: ${event.data.url}`);
    if (onAvatarExported) {
      onAvatarExported(event.data.url);
    }
    handleClose();
  };

  const handleOnUserSet = (event) => {
    console.log(`User ID is: ${event.data.id}`);
  };

  const handleUserAuthorized = (event) => {
    console.log(`User is:`, event.data);
  };

  const handleAssetUnlocked = (event) => {
    console.log(`Asset unlocked is: ${event.data.assetId}`);
  };

  const isAnimating = animationState === 'opening' || animationState === 'closing';
  const animationClass = animationState === 'closing' ? 'modal-exit' : 'modal-enter';

  return (
    <>
      <AnimationStyles />
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center ${animationClass}`}
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div className="relative w-full h-full">
          <button 
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg transition-transform duration-300 hover:scale-110"
            onClick={handleClose}
            aria-label="Close avatar creator"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          
          <AvatarCreator
            subdomain="demo"
            config={config}
            style={style}
            onAvatarExported={handleOnAvatarExported}
            onUserAuthorized={handleUserAuthorized}
            onAssetUnlock={handleAssetUnlocked}
            onUserSet={handleOnUserSet}
          />
        </div>
      </div>
    </>
  );
};

export default AvatarCreatorModal;
