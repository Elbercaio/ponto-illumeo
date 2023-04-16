import React from "react";
import "./input-text.component.scss";

interface Props {
  label: string;
  height: string;
  width: string;
  name: string;
}

export const InputText: React.FC<Props> = ({ label, height, width, name }) => (
  <div
    className="input-text"
    style={{
      height,
      width,
    }}
  >
    <label>
      {label}:
      <input type="text" name={name} />
    </label>
  </div>
);
