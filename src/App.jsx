import { useState } from 'react';
import GridFadeMenu from './components/GridFadeMenu';
import Sidebar from './components/Sidebar';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';

function App() {
  const [showMenu, setShowMenu] = useState(true);

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="relative h-screen w-full">
      <Canvas
        shadows
        camera = {{ position: [0, 0, 8], fov: 30}}
      >
        <color attach = "background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      {!showMenu && <Sidebar />}
      {showMenu && (
        <GridFadeMenu 
          onClose={handleCloseMenu} 
          hasOverlay={true}
          gridSize={{ rows: 8, cols: 12 }} 
        />
      )}
    </div>
  );
}

export default App;
