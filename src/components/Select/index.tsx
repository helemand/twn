import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface SelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  value: string | number;
  options: JSX.Element[];
  label: string;
}

const Select: React.FC<SelectProps> = ({ onChange, value, options, label }) => {
  return (
    <div className="form-item">
      <div className="form-item-label">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select-item game-form-item"
      >
        {options}
      </select>
      <div className="select-indicator">
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </div>
  );
};

export default Select;
