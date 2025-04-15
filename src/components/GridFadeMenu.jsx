import React, { useState, useEffect } from 'react';

function GridFadeMenu({ onClose, hasOverlay = true, gridSize = { rows: 8, cols: 12 } }) {
  const [isClosing, setIsClosing] = useState(false);
  const [gridCells, setGridCells] = useState([]);
  
  useEffect(() => {
    const cells = [];
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        cells.push({
          row,
          col,
          delay: (col * 40) + (row * 20) 
        });
      }
    }
    setGridCells(cells);
  }, [gridSize.rows, gridSize.cols]);
  
  const handleClick = () => {
    setIsClosing(true);
    
    const maxDelay = (gridSize.cols * 40) + (gridSize.rows * 20) + 400;
    setTimeout(() => {
      onClose();
    }, maxDelay);
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <div className="absolute inset-0 grid" 
           style={{ 
             gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
             gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`
           }}>
        {gridCells.map((cell, index) => (
          <div 
            key={index}
            style={{
              opacity: isClosing ? 0 : 1,
              transition: `opacity 400ms ease-out`,
              transitionDelay: isClosing ? `${cell.delay}ms` : '0ms',
              gridColumn: cell.col + 1,
              gridRow: cell.row + 1,
              background: hasOverlay
                ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('menu-background.png') center/cover no-repeat`
                : `url('menu-background.png') center/cover no-repeat`,
              backgroundSize: `${gridSize.cols * 100}% ${gridSize.rows * 100}%`,
              backgroundPosition: `${cell.col * 100 / (gridSize.cols - 1)}% ${cell.row * 100 / (gridSize.rows - 1)}%`
            }}
          />
        ))}
      </div>
      
      <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-7xl font-bold text-white mb-12 tracking-wide">
          3D AI Avatar
        </h1>
        
        <p className="italic text-white text-xl mt-4">
          press anywhere to continue
        </p>
      </div>
    </div>
  );
}

export default GridFadeMenu;
