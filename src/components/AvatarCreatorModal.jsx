import React, { useState, useEffect } from 'react';
import {
  AvatarCreator,
} from "@readyplayerme/react-avatar-creator";

const AvatarCreatorModal = ({ isOpen, onClose, onAvatarExported }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle mount/unmount and animations
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else if (isAnimating) {
      // Add delay before fully removing from DOM
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 400); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, isAnimating]);
  
  // Handle body scroll locking
  useEffect(() => {
    if (isOpen || isAnimating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isAnimating]);
  
  // Don't render if not open and not animating
  if (!isOpen && !isAnimating) return null;
  
  const config = {
    clearCache: true,
    bodyType: "fullbody",
    quickStart: false,
    language: "en",
  };

  const style = { width: "100%", height: "100%", border: "none" };

  const handleOnAvatarExported = (event) => {
    if (onAvatarExported) {
      onAvatarExported(event.data.url);
    }
    onClose();
  };

  const animationClass = isOpen ? 'modal-enter' : 'modal-exit';

  return (
    <>
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
        
        .modal-enter {
          animation: fadeIn 0.3s forwards;
        }
        
        .modal-exit {
          animation: fadeOut 0.4s forwards;
          pointer-events: none !important;
        }
      `}</style>
      
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center ${animationClass}`}
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div className="relative w-full h-full">
          <button 
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-300"
            onClick={onClose}
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
            onUserSet={(event) => console.log(`User ID is: ${event.data.id}`)}
            onUserAuthorized={(event) => console.log(`User is:`, event.data)}
            onAssetUnlock={(event) => console.log(`Asset unlocked is: ${event.data.assetId}`)}
          />
        </div>
      </div>
    </>
  );
};

export default AvatarCreatorModal;
