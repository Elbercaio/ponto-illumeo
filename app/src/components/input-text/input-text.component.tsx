import React from "react";
import "./input-text.component.scss";

interface Props {
  label: string;
}

const InputText: React.FC<Props> = ({ label }) => {
  return (
    <label>
      {label}:
      <input type="text" name="name" />
    </label>
  );
};

export default InputText;
