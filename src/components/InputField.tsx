import React from 'react';
import './InputField.css';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const mapKeyboardType = (keyboardType: string): string => {
  switch (keyboardType) {
    case 'email-address':
      return 'email';
    case 'numeric':
      return 'number';
    case 'phone-pad':
      return 'tel';
    default:
      return 'text';
  }
};

const InputField: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  return (
    <div className="inputFieldContainer">
      <input
        type={secureTextEntry ? 'password' : mapKeyboardType(keyboardType)}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
        className="inputFieldInput"
      />
    </div>
  );
};

export default InputField;