import React, { useState } from 'react';
import styles from './MultiSelectDropdown.module.css';

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
    <div className={styles.multiselect_dropdown}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
      {selectedOptions.length > 0 ? selectedOptions.map(option => option[displayProperty]).join(', ') : 'Wybierz kategorie'}
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className={styles.dropdown_list}>
          {options.map(option => (
            <label key={option} className={styles.dropdown_item}>
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