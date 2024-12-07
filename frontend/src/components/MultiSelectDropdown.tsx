import React, { useState } from 'react';

interface MultiSelectDropdownProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  displayProperty: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, selectedOptions, onChange, displayProperty }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter(item => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="multi-select-dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
      {selectedOptions.length > 0 ? selectedOptions.map(option => option[displayProperty]).join(', ') : 'Select categories'}
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map(option => (
            <label key={option} className="dropdown-item">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option[displayProperty]}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;