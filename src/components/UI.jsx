import React from 'react';

const UI = ({ onColorChange, onReset, currentColor, selectedCar, onCarChange }) => {
  const colors = [
    { name: 'Red', value: '#ff3333' },
    { name: 'Blue', value: '#3333ff' },
    { name: 'Green', value: '#33ff33' },
    { name: 'Silver', value: '#cccccc' },
    { name: 'Black', value: '#111111' }
  ];

  return (
    <div className="overlay-ui">
      <h1>VR {selectedCar.toUpperCase()} SHOWROOM</h1>
      
      <div className="controls-group">
        <h3>Model Selection</h3>
        <div className="model-selector">
          <button 
            className={`model-btn ${selectedCar === '720s' ? 'active' : ''}`}
            onClick={() => onCarChange('720s')}
          >
            McLaren
          </button>
          <button 
            className={`model-btn ${selectedCar === 'mustang_gt' ? 'active' : ''}`}
            onClick={() => onCarChange('mustang_gt')}
          >
            GT
          </button>
          <button 
            className={`model-btn ${selectedCar === 'porsche_gt' ? 'active' : ''}`}
            onClick={() => onCarChange('porsche_gt')}
          >
            Porsche
          </button>
        </div>
      </div>

      <div className="controls-group">
        <h3>Paint Options</h3>
        <div className="color-grid">
          {colors.map((c) => (
            <button
              key={c.value}
              className={`color-btn ${currentColor === c.value ? 'active' : ''}`}
              style={{ backgroundColor: c.value }}
              onClick={() => onColorChange(c.value)}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div className="action-group">
        <button className="main-btn" onClick={onReset}>
          Reset View
        </button>
      </div>

      <div className="instructions">
        <p>Orbit: Mouse Drag | Zoom: Scroll</p>
        <p>Click car to interact</p>
      </div>

      <style>{`
        .overlay-ui {
          position: absolute;
          top: 0;
          left: 0;
          width: 320px;
          height: 100%;
          padding: 40px;
          color: white;
          background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
          pointer-events: none;
          display: flex;
          flex-direction: column;
          z-index: 10;
        }

        .overlay-ui * {
          pointer-events: auto;
        }

        h1 {
          font-family: 'Exo 2', sans-serif;
          font-size: 1.8rem;
          margin-bottom: 2rem;
          letter-spacing: 2px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .controls-group {
          margin-bottom: 2rem;
        }

        h3 {
          font-size: 0.8rem;
          text-transform: uppercase;
          opacity: 0.6;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }

        .model-selector {
          display: flex;
          gap: 10px;
          margin-bottom: 1rem;
        }

        .model-btn {
          flex: 1;
          padding: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s;
        }

        .model-btn.active {
          background: rgba(255,255,255,0.2);
          border-color: white;
        }

        .color-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .color-btn {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s;
        }

        .color-btn:hover {
          transform: scale(1.1);
        }

        .color-btn.active {
          border-color: #fff;
          box-shadow: 0 0 10px rgba(255,255,255,0.3);
        }

        .action-group {
          margin-top: auto;
          margin-bottom: 2rem;
        }

        .main-btn {
          width: 100%;
          padding: 12px 20px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          cursor: pointer;
          font-weight: 600;
          text-transform: uppercase;
          transition: background 0.2s;
        }

        .main-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .instructions {
          font-size: 0.75rem;
          opacity: 0.4;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default UI;
