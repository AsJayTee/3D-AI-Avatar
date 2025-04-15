import React, { useState, useEffect, useRef } from 'react';
import AvatarCreatorModal from './AvatarCreatorModal';

const keyframes = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes slideIn {
    0% { transform: translateX(-100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(-100%); opacity: 0; }
  }
`;

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const sidebarRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setIsCollapsing(false);
    } else {
      setIsCollapsing(true);
      setTimeout(() => {
        setIsExpanded(false);
        setIsCollapsing(false);
      }, 300); 
    }
  };

  const handleOpenAvatarCreator = () => {
    setShowAvatarCreator(true);
  };

  const handleCloseAvatarCreator = () => {
    setShowAvatarCreator(false);
  };

  const handleAvatarCreated = (url) => {
    setAvatarUrl(url);
    console.log("Avatar created with URL:", url);
  };

  return (
    <div className="absolute left-0 top-0 z-10 h-full">
      <style>{keyframes}</style>
      
      {!isExpanded && isVisible && !isCollapsing && (
        <button 
          onClick={toggleSidebar}
          className="p-2 transition-all duration-300 transform translate-x-0 opacity-100 m-4"
          style={{
            animation: 'fadeIn 0.5s ease-out',
            background: 'transparent'
          }}
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))' }}>
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      )}

      {(isExpanded || isCollapsing) && (
        <div 
          ref={sidebarRef}
          className="h-full bg-white shadow-lg w-64 flex flex-col transition-all duration-500"
          style={{ 
            animation: isCollapsing 
              ? 'slideOut 0.3s ease-out forwards' 
              : 'slideIn 0.3s ease-out',
          }}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-lg">Avatar Controls</h2>
            <button 
              onClick={toggleSidebar}
              className="hover:bg-gray-100 p-1 rounded-full"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center w-full transition-colors"
              onClick={handleOpenAvatarCreator}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
              Create Avatar
            </button>
            
            {avatarUrl && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Your Avatar:</p>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="text-xs text-gray-500 truncate">{avatarUrl}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t mt-auto">
            <p className="text-sm text-gray-500">3D AI Avatar v1.0</p>
          </div>
        </div>
      )}

      <AvatarCreatorModal 
        isOpen={showAvatarCreator}
        onClose={handleCloseAvatarCreator}
        onAvatarExported={handleAvatarCreated}
      />
    </div>
  );
};

export default Sidebar;
