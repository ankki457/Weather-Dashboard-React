import React from 'react';

function UnitToggle({ units, onToggle }) {
  const handleToggle = () => {
    onToggle(units === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="unit-toggle">
      <label>
        <input
          type="checkbox"
          checked={units === 'imperial'}
          onChange={handleToggle}
        />
        Fahrenheit
      </label>
    </div>
  );
}

export default UnitToggle;
