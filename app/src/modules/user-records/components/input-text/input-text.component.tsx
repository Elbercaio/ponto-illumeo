import React from "react";
import "./input-text.component.scss";

interface Props {
  label: string;
}

export const InputText: React.FC<Props> = ({ label }) => (
  <label>
    {label}:
    <input type="text" name="name" />
  </label>
);
