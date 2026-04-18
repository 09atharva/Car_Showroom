import React, { Component, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress, OrbitControls } from '@react-three/drei';
import Scene from './components/Scene';
import UI from './components/UI';
import './App.css';

// Error Boundary to catch crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: 'white', background: '#220000', height: '100vh' }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error?.message}</pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px', marginTop: '20px' }}>
            Reload Showroom
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function CornerLoader() {
  const { progress, active } = useProgress();
  if (!active || progress === 100) return null;
  return (
    <div className="corner-loader">
      <div className="loader-spinner"></div>
      <span>Showroom Loading: {Math.round(progress)}%</span>
    </div>
  );
}

function App() {
  const [carColor, setCarColor] = useState('#ff3333');
  const [selectedCar, setSelectedCar] = useState('720s');

  return (
    <ErrorBoundary>
      <div className="app-container">
        <UI 
          onColorChange={setCarColor} 
          onReset={() => { 
            setCarColor('#ff3333');
            setSelectedCar('720s');
          }} 
          currentColor={carColor}
          selectedCar={selectedCar}
          onCarChange={setSelectedCar}
        />

        <CornerLoader />

        <Canvas 
          shadows 
          camera={{ position: [5, 3, 5], fov: 40 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <OrbitControls 
              enableDamping 
              maxPolarAngle={Math.PI / 2.1} 
              minDistance={1} 
              maxDistance={25} 
            />
            <Scene carColor={carColor} selectedCar={selectedCar} />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}

export default App;
