import React from 'react';
import './submit-button.component.scss';

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const SubmitButton: React.FC<Props> = ({ children, onClick }) => (
  <button onClick={onClick} type="submit">
    {children}
  </button>
);
