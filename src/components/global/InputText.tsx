import React from "react";

interface Props {
  placeholder: string
  label: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

const InputText: React.FC<Props> = ({ placeholder, label, onChange, value }) => {

  return (
    <div className="input-container">
      <div className="input-label">
        <p>{label}</p>
      </div>
      <div className="input-text">
        <input type="text"
               placeholder={placeholder}
               value={value}
               onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputText;