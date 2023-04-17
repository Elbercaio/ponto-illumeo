import React from 'react';
import './input-text.component.scss';

interface Props {
  label: string;
  name: string;
}

export const InputText: React.FC<Props> = ({ label, name }) => (
  <div className="input-text">
    <label>
      {label}:
      <input type="text" name={name} />
    </label>
  </div>
);
